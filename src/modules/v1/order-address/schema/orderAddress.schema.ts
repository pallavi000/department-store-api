import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class OrderAddress {
  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  street: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  zip_code: string;

  @Prop({ type: String })
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;
}

const OrderAddressSchema = SchemaFactory.createForClass(OrderAddress);
export const OrderAddressModel = {
  name: OrderAddress.name,
  schema: OrderAddressSchema,
};
