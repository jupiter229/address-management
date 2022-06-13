/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type AssetDocument = Asset & Document;
export declare class Asset {
    name: string;
    code: string;
    decimals: number;
    contractAddress: string;
    matchingAsset: string;
    color: string;
    coinGeckoId: string;
    chain: string;
    type: string;
    isEnable: boolean;
}
export declare const AssetSchema: import("mongoose").Schema<Document<Asset, any, any>, import("mongoose").Model<Document<Asset, any, any>, any, any, any>, {}, {}>;
