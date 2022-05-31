import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from '../authentication/schemas/auth.schema';
import { Wallet, WalletSchema } from './schema/wallet.schema';
import { NetworkClientModule } from '../network-client/network-client.module';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [
    NetworkClientModule,
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
  ],
})
export class WalletModule {}
