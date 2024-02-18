import { IsArray, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  shipping: string;

  @IsString()
  billing: string;

  @IsNumber()
  total: number;

  @IsString()
  payment_method: string;

  @IsArray()
  carts: string[];
}
