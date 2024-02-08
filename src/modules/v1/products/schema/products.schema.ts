import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  detail: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  })
  category: mongoose.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
  })
  brand: mongoose.Types.ObjectId;

  @Prop()
  review: string[];

  @Prop({ required: true })
  expiry_date: Date;
}

const ProductsSchema = SchemaFactory.createForClass(Products);
export const ProductsModel = { name: Products.name, schema: ProductsSchema };
