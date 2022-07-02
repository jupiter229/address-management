"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    defaultAssets: {
        mainnet: ['WBTC.b', 'WETH.b', 'BNB'],
        testnet: ['WBTC.b', 'WETH.b', 'BNB'],
    },
    infuraApiKey: 'da99ebc8c0964bb8bb757b6f8cc40f1f',
    exploraApis: {
        testnet: 'https://liquality.io/testnet/electrs',
        mainnet: 'https://api-mainnet-bitcoin-electrs.liquality.io',
    },
    batchEsploraApis: {
        testnet: 'https://liquality.io/electrs-testnet-batch',
        mainnet: 'https://api-mainnet-bitcoin-electrs-batch.liquality.io',
    },
    discordUrl: 'https://discord.gg/Xsqw7PW8wk',
    networks: ['mainnet', 'testnet'],
    chains: [
        'bitcoin',
        'ethereum',
        'rsk',
        'bsc',
        'near',
        'polygon',
        'arbitrum',
        'solana',
    ],
};
//# sourceMappingURL=build.config.js.map