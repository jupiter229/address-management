import * as mongoose from 'mongoose';
import { Asset } from '../../asset/schemas/asset.schema';
import { Address } from './address.schema';
export declare type DepositDocument = Deposit & mongoose.Document;
export declare class Deposit {
    address: Address;
    asset: Asset;
    amount: number;
    txHash: string;
}
export declare const DepositSchema: mongoose.Schema<mongoose.Document<Deposit, any, any>, mongoose.Model<mongoose.Document<Deposit, any, any>, any, any, any>, {}, {}>;
