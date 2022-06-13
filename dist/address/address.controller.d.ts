import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create.address.dto';
import { TransferAssetsDto } from './dto/transfer.assets.dto';
export declare class AddressController {
    private addressService;
    constructor(addressService: AddressService);
    generateNewAddress(createAddressDto: CreateAddressDto, req: any): Promise<{
        address: string;
        code: string;
    }>;
    getAddresses(req: any, query: any): Promise<any>;
    getAssets(params: any, req: any): Promise<{
        asset: string;
        balance: import("bignumber.js").default;
        address: string;
    }>;
    transferAsset(transferAssetsDto: TransferAssetsDto, req: any, params: any): Promise<{
        hash: any;
        message: string;
    }>;
}
