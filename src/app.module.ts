import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { NetworkClientModule } from './network-client/network-client.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { WalletModule } from './wallet/wallet.module';
import { WalletSchema, Wallet } from './wallet/schema/wallet.schema';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // AddressModule,
    AuthenticationModule,
    NetworkClientModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    MongooseModule.forFeatureAsync([
      {
        name: Wallet.name,
        useFactory: async (connection: Connection) => {
          const schema = WalletSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement, {
            inc_field: 'derivationIndex',
            start_seq: 0,
          });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),

    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
