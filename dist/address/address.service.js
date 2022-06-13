"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const address_schema_1 = require("./schema/address.schema");
const mongoose_2 = require("mongoose");
const auth_schema_1 = require("../authentication/schemas/auth.schema");
const cryptoassets_1 = require("@liquality/cryptoassets");
const asset_1 = require("../network-client/utils/asset");
const config_1 = require("@nestjs/config");
const authentication_service_1 = require("../authentication/authentication.service");
const network_client_service_1 = require("../network-client/network-client.service");
const bignumber_js_1 = require("bignumber.js");
const crypto_asset_service_1 = require("../network-client/crypto.asset.service");
let AddressService = class AddressService {
    constructor(addressDocumentModel, authDocumentModel, authenticationService, networkClientService, configService, cryptoAssetService) {
        this.addressDocumentModel = addressDocumentModel;
        this.authDocumentModel = authDocumentModel;
        this.authenticationService = authenticationService;
        this.networkClientService = networkClientService;
        this.configService = configService;
        this.cryptoAssetService = cryptoAssetService;
    }
    async generateAddress(userId, createAddressDto) {
        var _a;
        const assetData = this.cryptoAssetService.getSingleCryptoAssetData(createAddressDto.code);
        if (assetData) {
            const user = await this.authDocumentModel.findById(userId);
            const existingAddress = await this.addressDocumentModel
                .findOne({
                asset: createAddressDto.code,
                user,
            })
                .sort({ derivationIndex: -1 });
            const derivationIndex = existingAddress
                ? existingAddress.derivationIndex + 1
                : 0;
            const networkClient = await this.networkClientService.createClient(createAddressDto.code, derivationIndex);
            const rawAddresses = await networkClient.wallet.getAddresses();
            const result = rawAddresses[0];
            const rawAddress = (0, asset_1.isEthereumChain)(createAddressDto.code)
                ? result.address.replace('0x', '')
                : result.address;
            const asset = this.cryptoAssetService.getSingleCryptoAssetData(createAddressDto.code);
            const formattedAddress = (_a = cryptoassets_1.chains[asset === null || asset === void 0 ? void 0 : asset.chain]) === null || _a === void 0 ? void 0 : _a.formatAddress(rawAddress);
            const address = await this.saveNewAddress(userId, Object.assign(Object.assign({}, createAddressDto), { address: formattedAddress, derivationIndex }));
            if (address) {
                return address;
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Asset is not supported, please check the asset parameters and try again',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async saveNewAddress(userId, createAddressDto) {
        const existingAddress = await this.addressDocumentModel.findOne({
            address: createAddressDto.address,
            asset: createAddressDto.code,
        });
        if (existingAddress) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Address has been added already',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const user = await this.authDocumentModel.findById(userId);
            if (user) {
                return this.addressDocumentModel.create({
                    address: createAddressDto.address,
                    asset: createAddressDto.code,
                    derivationIndex: createAddressDto.derivationIndex,
                    user,
                });
            }
        }
    }
    validateNewAddressChain(chain) {
        const validAssetChains = ['ethereum', 'bitcoin', 'bsc'];
        if (validAssetChains.indexOf(chain.toLowerCase()) === -1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Unsupported asset chain',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAddresses(userId, queryOptions) {
        const user = await this.authDocumentModel.findById(userId);
        const options = Object.assign(Object.assign({}, queryOptions), { select: 'address asset', limit: parseInt(process.env.PAGINATION_LIMIT), collation: {
                locale: 'en',
            } });
        return this.addressDocumentModel.paginate({ user }, options);
    }
    async transferAsset(userId, addressId, transferAssetsDto) {
        const existingAddress = await this.getExistingAddress(addressId);
        const client = await this.networkClientService.createClient(transferAssetsDto.code, existingAddress.derivationIndex);
        const originalEstimateGas = client._providers[0].estimateGas;
        const asset = this.cryptoAssetService.getSingleCryptoAssetData(transferAssetsDto.code);
        const amount = (0, cryptoassets_1.currencyToUnit)(asset, transferAssetsDto.amount).toNumber();
        const fees = await client.chain.getFees();
        const selectedSpeed = 'fast';
        let tx;
        try {
            tx = await client.chain.sendTransaction({
                to: transferAssetsDto.to,
                value: new bignumber_js_1.default(amount),
                data: undefined,
                fee: fees[selectedSpeed].fee,
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: e.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            client._providers[0].estimateGas = originalEstimateGas;
        }
        return {
            hash: tx,
            message: 'Transaction has been initiated',
        };
    }
    async getExistingAddress(addressId) {
        const existingAddress = await this.addressDocumentModel.findById(addressId);
        if (existingAddress) {
            return existingAddress;
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.BAD_REQUEST,
            error: 'Wallet address does not exist',
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    async getAssets(userId, addressId) {
        const existingAddress = await this.getExistingAddress(addressId);
        const networkClient = await this.networkClientService.createClient(existingAddress.asset, existingAddress.derivationIndex);
        const addresses = await networkClient.wallet.getUsedAddresses();
        const asset = this.cryptoAssetService.getSingleCryptoAssetData(existingAddress.asset);
        const balance = addresses.length === 0
            ? 0
            : (await networkClient.chain.getBalance(addresses)).toNumber();
        return {
            asset: existingAddress.asset,
            balance: (0, cryptoassets_1.unitToCurrency)(asset, balance),
            address: existingAddress.address,
        };
    }
};
AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(address_schema_1.Address.name)),
    __param(1, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        authentication_service_1.AuthenticationService,
        network_client_service_1.NetworkClientService,
        config_1.ConfigService,
        crypto_asset_service_1.CryptoAssetService])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map