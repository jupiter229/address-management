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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const wallet_schema_1 = require("./schema/wallet.schema");
const mongoose_2 = require("mongoose");
const auth_schema_1 = require("../authentication/schemas/auth.schema");
const cryptoassets_1 = require("@liquality/cryptoassets");
const cryptoassets_2 = require("@liquality/wallet-core/dist/utils/cryptoassets");
const crypto_asset_service_1 = require("../network-client/crypto.asset.service");
const config_1 = require("@nestjs/config");
const network_client_service_1 = require("../network-client/network-client.service");
const build_config_1 = require("../network-client/build.config");
let WalletService = class WalletService {
    constructor(walletDocumentModel, authDocumentModel, cryptoAssetService, configService, networkClientService) {
        this.walletDocumentModel = walletDocumentModel;
        this.authDocumentModel = authDocumentModel;
        this.cryptoAssetService = cryptoAssetService;
        this.configService = configService;
        this.networkClientService = networkClientService;
    }
    async createWallet(userId) {
        const user = await this.authDocumentModel.findById(userId);
        if (user) {
            const wallet = await this.walletDocumentModel.create({
                user,
            });
            return {
                id: wallet.id,
            };
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.NOT_FOUND,
            error: 'User not found',
        }, common_1.HttpStatus.NOT_FOUND);
    }
    getSupportedAssets() {
        const network = this.configService.get('APP_NETWORK');
        return build_config_1.default.defaultAssets[network];
    }
    async getAssets(walletId) {
        const assets = this.getSupportedAssets();
        const wallet = await this.walletDocumentModel.findById(walletId);
        const results = [];
        for (const code of assets) {
            results.push(await this.generateAddress(code, wallet.derivationIndex));
        }
        return results;
    }
    async generateAddress(code, derivationIndex) {
        var _a;
        const assetData = this.cryptoAssetService.getSingleCryptoAssetData(code)
            ? this.cryptoAssetService.getSingleCryptoAssetData(code)
            : this.getCustomAsset(code);
        if (assetData) {
            const networkClient = await this.networkClientService.createClient(code, derivationIndex);
            const rawAddresses = await networkClient.wallet.getUnusedAddress();
            const chainId = assetData.chain;
            const address = (_a = cryptoassets_1.chains[chainId]) === null || _a === void 0 ? void 0 : _a.formatAddress(rawAddresses.address, this.configService.get('APP_NETWORK'));
            return {
                address: address,
                code: code,
                balance: 0,
                chain: assetData.chain,
                color: assetData.color,
            };
        }
    }
    getCustomAsset(code) {
        if (cryptoassets_2.default[code]) {
            return cryptoassets_2.default[code];
        }
        const wallet = this.networkClientService.getWallet();
        return wallet.state.customTokens.mainnet[wallet.state.activeWalletId].find((asset) => {
            return asset.symbol === code;
        });
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_schema_1.Wallet.name)),
    __param(1, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        crypto_asset_service_1.CryptoAssetService,
        config_1.ConfigService,
        network_client_service_1.NetworkClientService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map