import { AddressDocument } from './schema/address.schema';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create.address.dto';
import { AuthDocument } from '../authentication/schemas/auth.schema';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../authentication/authentication.service';
import { NetworkClientService } from '../network-client/network-client.service';
import { TransferAssetsDto } from './dto/transfer.assets.dto';
import BN from 'bignumber.js';
import { CryptoAssetService } from '../network-client/crypto.asset.service';
export declare class AddressService {
    private addressDocumentModel;
    private authDocumentModel;
    private readonly authenticationService;
    private readonly networkClientService;
    private readonly configService;
    private readonly cryptoAssetService;
    constructor(addressDocumentModel: Model<AddressDocument>, authDocumentModel: Model<AuthDocument>, authenticationService: AuthenticationService, networkClientService: NetworkClientService, configService: ConfigService, cryptoAssetService: CryptoAssetService);
    generateAddress(userId: string, createAddressDto: CreateAddressDto): Promise<AddressDocument>;
    private saveNewAddress;
    validateNewAddressChain(chain: string): void;
    getAddresses(userId: string, queryOptions: any): Promise<any>;
    transferAsset(userId: string, addressId: string, transferAssetsDto: TransferAssetsDto): Promise<{
        hash: any;
        message: string;
    }>;
    private getExistingAddress;
    getAssets(userId: string, addressId: string): Promise<{
        asset: string;
        balance: BN;
        address: string;
    }>;
}
