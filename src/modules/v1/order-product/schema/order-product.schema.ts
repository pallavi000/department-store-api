import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class OrderProduct {
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  })
  product: mongoose.Types.ObjectId;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  })
  order: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  detail: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  quantity: number;
}

const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
export const OrderProductModel = {
  name: OrderProduct.name,
  schema: OrderProductSchema,
};
