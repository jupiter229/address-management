"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainNetworks = exports.Networks = void 0;
const bitcoin_networks_1 = require("@liquality/bitcoin-networks");
const ethereum_networks_1 = require("@liquality/ethereum-networks");
const near_networks_1 = require("@liquality/near-networks");
const solana_networks_1 = require("@liquality/solana-networks");
exports.Networks = ['mainnet', 'testnet'];
exports.ChainNetworks = {
    bitcoin: {
        testnet: bitcoin_networks_1.BitcoinNetworks.bitcoin_testnet,
        mainnet: bitcoin_networks_1.BitcoinNetworks.bitcoin,
    },
    ethereum: {
        testnet: ethereum_networks_1.EthereumNetworks.ropsten,
        mainnet: ethereum_networks_1.EthereumNetworks.ethereum_mainnet,
    },
    rsk: {
        testnet: ethereum_networks_1.EthereumNetworks.rsk_testnet,
        mainnet: ethereum_networks_1.EthereumNetworks.rsk_mainnet,
    },
    bsc: {
        testnet: ethereum_networks_1.EthereumNetworks.bsc_testnet,
        mainnet: ethereum_networks_1.EthereumNetworks.bsc_mainnet,
    },
    polygon: {
        testnet: ethereum_networks_1.EthereumNetworks.polygon_testnet,
        mainnet: ethereum_networks_1.EthereumNetworks.polygon_mainnet,
    },
    arbitrum: {
        testnet: ethereum_networks_1.EthereumNetworks.arbitrum_testnet,
        mainnet: ethereum_networks_1.EthereumNetworks.arbitrum_mainnet,
    },
    near: {
        testnet: near_networks_1.NearNetworks.near_testnet,
        mainnet: near_networks_1.NearNetworks.near_mainnet,
    },
    solana: {
        testnet: solana_networks_1.SolanaNetworks.solana_testnet,
        mainnet: solana_networks_1.SolanaNetworks.solana_mainnet,
    },
};
//# sourceMappingURL=networks.js.map