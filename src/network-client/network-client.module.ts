import { Module } from '@nestjs/common';
import { NetworkClientService } from './network-client.service';
import { CryptoAssetService } from './crypto.asset.service';

@Module({
  providers: [NetworkClientService, CryptoAssetService],
  exports: [NetworkClientService, CryptoAssetService],
})
export class NetworkClientModule {}
