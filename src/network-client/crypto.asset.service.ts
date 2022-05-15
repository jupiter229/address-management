import { Injectable } from '@nestjs/common';
import { Asset } from '@liquality/cryptoassets';
import { getCryptoAssets } from './utils/asset';

@Injectable()
export class CryptoAssetService {
  getCryptoAssets() {
    return getCryptoAssets();
  }
  getSingleCryptoAssetData(code: string): Asset {
    const cryptoassets = this.getCryptoAssets();
    const assetData = cryptoassets[code];
    return assetData;
  }
}
