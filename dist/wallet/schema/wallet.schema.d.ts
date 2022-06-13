import * as mongoose from 'mongoose';
import { Auth } from '../../authentication/schemas/auth.schema';
export declare type WalletDocument = Wallet & mongoose.Document;
export declare class Wallet {
    derivationIndex: number;
    user: Auth;
}
export declare const WalletSchema: mongoose.Schema<mongoose.Document<Wallet, any, any>, mongoose.Model<mongoose.Document<Wallet, any, any>, any, any, any>, {}, {}>;
