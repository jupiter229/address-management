import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { NetworkClientModule } from './network-client/network-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AddressModule,
    AuthenticationModule,
    NetworkClientModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-paginate-v2'));
        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
