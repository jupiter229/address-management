import * as mongoose from 'mongoose';
export declare type AuthDocument = Auth & mongoose.Document;
export declare class Auth {
    email: string;
    password: string;
    isActivated: boolean;
}
export declare const AuthSchema: mongoose.Schema<mongoose.Document<Auth, any, any>, mongoose.Model<mongoose.Document<Auth, any, any>, any, any, any>, {}, {}>;
