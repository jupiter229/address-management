"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkClientModule = void 0;
const common_1 = require("@nestjs/common");
const network_client_service_1 = require("./network-client.service");
const crypto_asset_service_1 = require("./crypto.asset.service");
let NetworkClientModule = class NetworkClientModule {
};
NetworkClientModule = __decorate([
    (0, common_1.Module)({
        providers: [network_client_service_1.NetworkClientService, crypto_asset_service_1.CryptoAssetService],
        exports: [network_client_service_1.NetworkClientService, crypto_asset_service_1.CryptoAssetService],
    })
], NetworkClientModule);
exports.NetworkClientModule = NetworkClientModule;
//# sourceMappingURL=network-client.module.js.map