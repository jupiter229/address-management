import { AssetDocument } from './schemas/asset.schema';
import { AddressDocument } from '../address/schema/address.schema';
import { Model } from 'mongoose';
export declare class AssetService {
    private assetDocumentModel;
    private addressDocumentModel;
    constructor(assetDocumentModel: Model<AssetDocument>, addressDocumentModel: Model<AddressDocument>);
}
