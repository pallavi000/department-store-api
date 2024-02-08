import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: number;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = { name: User.name, schema: UserSchema };
