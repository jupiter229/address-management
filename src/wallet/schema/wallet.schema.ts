import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Auth } from '../../authentication/schemas/auth.schema';

export type WalletDocument = Wallet & mongoose.Document;

@Schema()
export class Wallet {
  @Prop({ type: Number, unique: true })
  derivationIndex: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  user: Auth;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
