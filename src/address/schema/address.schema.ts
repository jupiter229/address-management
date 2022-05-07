import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Auth } from '../../authentication/schemas/auth.schema';

export type AddressDocument = Address & mongoose.Document;

@Schema()
export class Address {
  @Prop({ required: true, lowercase: true, unique: true })
  address: string;

  @Prop({ type: Number, default: -1, unique: true, required: true })
  derivationIndex: number;

  @Prop({ required: true })
  asset: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  user: Auth;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
