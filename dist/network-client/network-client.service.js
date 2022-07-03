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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkClientService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const wallet_core_1 = require("@liquality/wallet-core");
const defaultOptions_1 = require("@liquality/wallet-core/dist/walletOptions/defaultOptions");
const cryptoassets_1 = require("@liquality/cryptoassets");
let NetworkClientService = class NetworkClientService {
    constructor(configService) {
        this.configService = configService;
        this.initWallet();
    }
    async initWallet() {
        this.wallet = (0, wallet_core_1.setupWallet)(Object.assign({}, defaultOptions_1.default));
        await this.wallet.dispatch.createWallet({
            key: 'satoshi',
            mnemonic: this.configService.get('MNEMONIC'),
            imported: true,
        });
        await this.wallet.dispatch.unlockWallet({ key: 'satoshi' });
        await this.wallet.dispatch.changeActiveNetwork({
            network: this.configService.get('APP_NETWORK'),
        });
        await this.addCustomToken();
    }
    async createClient(asset, index = 0) {
        return this.wallet.getters.client({
            network: this.wallet.state.activeNetwork,
            walletId: this.wallet.state.activeWalletId,
            asset: asset,
            accountIndex: index,
        });
    }
    getWallet() {
        return this.wallet;
    }
    async addCustomToken() {
        await this.wallet.dispatch.addCustomToken({
            network: this.configService.get('APP_NETWORK'),
            walletId: this.wallet.state.activeWalletId,
            chain: cryptoassets_1.ChainId.BinanceSmartChain,
            symbol: 'WBTC.b',
            name: 'Binance-Peg BTCB Token',
            contractAddress: '0x5a679055d1a1ac067f34b2e5109b4198da0ebf43',
            matchingAsset: 'WBTC',
            decimals: 18,
        });
        await this.wallet.dispatch.addCustomToken({
            network: this.configService.get('APP_NETWORK'),
            walletId: this.wallet.state.activeWalletId,
            chain: cryptoassets_1.ChainId.BinanceSmartChain,
            symbol: 'WETH.b',
            name: 'Binance-Peg Ethereum Token',
            contractAddress: '0x6e95ef4d4026ceb7d769c52c2a3318240d9ad2ec',
            matchingAsset: 'WETH',
            decimals: 18,
        });
    }
};
NetworkClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NetworkClientService);
exports.NetworkClientService = NetworkClientService;
//# sourceMappingURL=network-client.service.js.map