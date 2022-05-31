import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './schema/wallet.schema';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from '../authentication/schemas/auth.schema';
import { chains } from '@liquality/cryptoassets';
import cryptoassets from '@liquality/wallet-core/dist/utils/cryptoassets';
import { CryptoAssetService } from '../network-client/crypto.asset.service';
import { ConfigService } from '@nestjs/config';
import { NetworkClientService } from '../network-client/network-client.service';
import buildConfig from '../network-client/build.config';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private walletDocumentModel: Model<WalletDocument>,
    @InjectModel(Auth.name) private authDocumentModel: Model<AuthDocument>,
    private readonly cryptoAssetService: CryptoAssetService,
    private readonly configService: ConfigService,
    private readonly networkClientService: NetworkClientService,
  ) {}
  async createWallet(userId: string) {
    const user = await this.authDocumentModel.findById(userId);

    if (user) {
      const wallet = await this.walletDocumentModel.create({
        user,
      });
      return {
        id: wallet.id,
      };
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
  getSupportedAssets() {
    const network = this.configService.get('APP_NETWORK');
    return buildConfig.defaultAssets[network];
  }
  async getAssets(walletId: string) {
    const assets = this.getSupportedAssets();
    const wallet = await this.walletDocumentModel.findById(walletId);

    const results = [];
    for (const code of assets) {
      results.push(await this.generateAddress(code, wallet.derivationIndex));
    }
    return results;
  }

  async generateAddress(code: string, derivationIndex: number): Promise<any> {
    const assetData = this.cryptoAssetService.getSingleCryptoAssetData(code)
      ? this.cryptoAssetService.getSingleCryptoAssetData(code)
      : this.getCustomAsset(code);

    if (assetData) {
      const networkClient = await this.networkClientService.createClient(
        code,
        derivationIndex,
      );

      const rawAddresses = await networkClient.wallet.getUnusedAddress();

      const chainId = assetData.chain;

      const address = chains[chainId]?.formatAddress(
        rawAddresses.address,
        this.configService.get('APP_NETWORK'),
      );

      return {
        address: address,
        code: code,
        balance: 0,
        chain: assetData.chain,
        color: assetData.color,
      };
    }
  }
  private getCustomAsset(code) {
    if (cryptoassets[code]) {
      return cryptoassets[code];
    }
    const wallet = this.networkClientService.getWallet();
    return wallet.state.customTokens.mainnet[wallet.state.activeWalletId].find(
      (asset) => {
        return asset.symbol === code;
      },
    );
  }
}
