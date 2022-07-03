import { Injectable } from '@nestjs/common';
import { Client } from '@liquality/client';
import { ConfigService } from '@nestjs/config';
import { setupWallet } from '@liquality/wallet-core';
import defaultOptions from '@liquality/wallet-core/dist/walletOptions/defaultOptions'; // Default options
import { ChainId } from '@liquality/cryptoassets';

@Injectable()
export class NetworkClientService {
  wallet;
  constructor(private readonly configService: ConfigService) {
    this.initWallet();
  }
  private async initWallet() {
    this.wallet = setupWallet({
      ...defaultOptions,
    });
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

  public async createClient(asset: string, index = 0): Promise<Client> {
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

  private async addCustomToken() {
    await this.wallet.dispatch.addCustomToken({
      network: this.configService.get('APP_NETWORK'),
      walletId: this.wallet.state.activeWalletId,
      chain: ChainId.BinanceSmartChain,
      symbol: 'WBTC.b',
      name: 'Binance-Peg BTCB Token',
      contractAddress: '0x5a679055d1a1ac067f34b2e5109b4198da0ebf43',
      matchingAsset: 'WBTC',
      decimals: 18,
    });
    await this.wallet.dispatch.addCustomToken({
      network: this.configService.get('APP_NETWORK'),
      walletId: this.wallet.state.activeWalletId,
      chain: ChainId.BinanceSmartChain,
      symbol: 'WETH.b',
      name: 'Binance-Peg Ethereum Token',
      contractAddress: '0x6e95ef4d4026ceb7d769c52c2a3318240d9ad2ec',
      matchingAsset: 'WETH',
      decimals: 18,
    });
  }
}
