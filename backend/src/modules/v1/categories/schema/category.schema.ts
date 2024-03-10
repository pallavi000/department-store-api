import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);
export const CategoryModel = { name: Category.name, schema: CategorySchema };
