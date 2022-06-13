"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDerivationPath = void 0;
const cryptoassets_1 = require("@liquality/cryptoassets");
const networks_1 = require("./networks");
const address_1 = require("./address");
const types_1 = require("@liquality/types");
const getBitcoinDerivationPath = (accountType, coinType, index) => {
    return `${address_1.BTC_ADDRESS_TYPE_TO_PREFIX[types_1.bitcoin.AddressType.BECH32]}'/${coinType}'/${index}'`;
};
const getEthereumBasedDerivationPath = (coinType, index) => `m/44'/${coinType}'/${index}'/0/0`;
const derivationPaths = {
    [cryptoassets_1.ChainId.Bitcoin]: (network, index, accountType = 'default') => {
        const bitcoinNetwork = networks_1.ChainNetworks[cryptoassets_1.ChainId.Bitcoin][network];
        return getBitcoinDerivationPath(accountType, bitcoinNetwork.coinType, index);
    },
    [cryptoassets_1.ChainId.Ethereum]: (network, index) => {
        const ethNetwork = networks_1.ChainNetworks[cryptoassets_1.ChainId.Ethereum][network];
        return getEthereumBasedDerivationPath(ethNetwork.coinType, index);
    },
    [cryptoassets_1.ChainId.Rootstock]: (network, index, accountType = 'default') => {
        let coinType;
        if (accountType === 'rsk_ledger') {
            coinType = network === 'mainnet' ? '137' : '37310';
        }
        else {
            const ethNetwork = networks_1.ChainNetworks[cryptoassets_1.ChainId.Rootstock][network];
            coinType = ethNetwork.coinType;
        }
        return getEthereumBasedDerivationPath(coinType, index);
    },
    [cryptoassets_1.ChainId.BinanceSmartChain]: (network, index) => {
        const ethNetwork = networks_1.ChainNetworks[cryptoassets_1.ChainId.BinanceSmartChain][network];
        return getEthereumBasedDerivationPath(ethNetwork.coinType, index);
    },
    [cryptoassets_1.ChainId.Near]: (network, index) => {
        const nearNetwork = networks_1.ChainNetworks[cryptoassets_1.ChainId.Near][network];
        return `m/44'/${nearNetwork.coinType}'/${index}'`;
    },
    [cryptoassets_1.ChainId.Polygon]: (network, index) => {
        const ethNetwork = networks_1.ChainNetworks[cryptoassets_1.ChainId.Polygon][network];
        return getEthereumBasedDerivationPath(ethNetwork.coinType, index);
    },
    [cryptoassets_1.ChainId.Arbitrum]: (network, index) => {
        const ethNetwork = networks_1.ChainNetworks[cryptoassets_1.ChainId.Arbitrum][network];
        return getEthereumBasedDerivationPath(ethNetwork.coinType, index);
    },
    [cryptoassets_1.ChainId.Solana]: (network, index) => {
        const solanaNetwork = networks_1.ChainNetworks[cryptoassets_1.ChainId.Solana][network];
        return `m/44'/501'/${solanaNetwork.walletIndex}'/${index}'`;
    },
};
const getDerivationPath = (chainId, network, index, accountType) => {
    return derivationPaths[chainId](network, index, accountType);
};
exports.getDerivationPath = getDerivationPath;
//# sourceMappingURL=derivationPath.js.map