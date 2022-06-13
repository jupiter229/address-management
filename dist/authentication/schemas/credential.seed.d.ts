import * as mongoose from 'mongoose';
import { Auth } from './auth.schema';
export declare type CredentialSeedDocument = CredentialSeed & mongoose.Document;
export declare class CredentialSeed {
    seedPhrase: string;
    currentDerivationIndex: number;
    user: Auth | string;
}
export declare const CredentialSeedSchema: mongoose.Schema<mongoose.Document<CredentialSeed, any, any>, mongoose.Model<mongoose.Document<CredentialSeed, any, any>, any, any, any>, {}, {}>;
