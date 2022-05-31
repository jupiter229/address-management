import {
  assets,
  isEthereumChain as _isEthereumChain,
  testnetAssets,
} from '@liquality/cryptoassets';

export const isEthereumChain = (asset) => {
  const cryptoassets = getCryptoAssets();
  const chain = cryptoassets[asset]?.chain;
  return _isEthereumChain(chain);
};

export const getCryptoAssets = () => {
  if (process.env.APP_NETWORK === 'mainnet') {
    return assets;
  }
  return testnetAssets;
};
