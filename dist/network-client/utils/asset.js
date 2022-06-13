"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoAssets = exports.isEthereumChain = void 0;
const cryptoassets_1 = require("@liquality/cryptoassets");
const isEthereumChain = (asset) => {
    var _a;
    const cryptoassets = (0, exports.getCryptoAssets)();
    const chain = (_a = cryptoassets[asset]) === null || _a === void 0 ? void 0 : _a.chain;
    return (0, cryptoassets_1.isEthereumChain)(chain);
};
exports.isEthereumChain = isEthereumChain;
const getCryptoAssets = () => {
    if (process.env.APP_NETWORK === 'mainnet') {
        return cryptoassets_1.assets;
    }
    return cryptoassets_1.testnetAssets;
};
exports.getCryptoAssets = getCryptoAssets;
//# sourceMappingURL=asset.js.map