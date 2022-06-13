import * as mongoose from 'mongoose';
import { Auth } from '../../authentication/schemas/auth.schema';
export declare type AddressDocument = Address & mongoose.Document;
export declare class Address {
    address: string;
    derivationIndex: number;
    asset: string;
    user: Auth;
}
export declare const AddressSchema: mongoose.Schema<mongoose.Document<Address, any, any>, mongoose.Model<mongoose.Document<Address, any, any>, any, any, any>, {}, {}>;
