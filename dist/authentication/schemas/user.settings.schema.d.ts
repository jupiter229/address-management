import * as mongoose from 'mongoose';
import { Auth } from './auth.schema';
export declare type UserSettingsDocument = UserSettings & mongoose.Document;
export declare class UserSettings {
    callbackUrl: string;
    user: Auth;
}
export declare const UserSettingsSchema: mongoose.Schema<mongoose.Document<UserSettings, any, any>, mongoose.Model<mongoose.Document<UserSettings, any, any>, any, any, any>, {}, {}>;
