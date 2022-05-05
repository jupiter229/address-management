import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NetworkClientModule } from '../network-client/network-client.module';
import { Address, AddressSchema } from './schema/address.schema';
import { AuthSchema, Auth } from '../authentication/schemas/auth.schema';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [
    AuthenticationModule,
    NetworkClientModule,
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
  ],
})
export class AddressModule {}
