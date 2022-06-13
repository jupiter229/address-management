import { Asset } from '@liquality/cryptoassets';
export declare class CryptoAssetService {
    getCryptoAssets(): {
        [x: string]: Asset;
    };
    getSingleCryptoAssetData(code: string): Asset;
}
