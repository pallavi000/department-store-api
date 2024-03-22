import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'OrderProduct',
  })
  products: mongoose.Types.ObjectId[];

  @Prop({ type: String, enum: ['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER'] })
  payment_method: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderAddress',
  })
  shipping: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderAddress',
  })
  billing: mongoose.Types.ObjectId;

  @Prop({ type: Number })
  total: number;
}

const OrderSchema = SchemaFactory.createForClass(Order);
export const OrderModel = { name: Order.name, schema: OrderSchema };
