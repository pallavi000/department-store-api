import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Address {
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zip_code: number;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;
}

const AddressSchema = SchemaFactory.createForClass(Address);
export const AddressModel = { name: Address.name, schema: AddressSchema };
