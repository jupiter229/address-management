import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './schemas/asset.schema';
import { Address, AddressSchema } from '../address/schema/address.schema';

@Module({
  providers: [AssetService],
  imports: [
    MongooseModule.forFeature([
      { name: Asset.name, schema: AssetSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
})
export class AssetModule {}
