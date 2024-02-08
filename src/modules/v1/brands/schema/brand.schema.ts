import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  detail: string;
}

const BrandSchema = SchemaFactory.createForClass(Brand);
export const BrandModel = { name: Brand.name, schema: BrandSchema };
