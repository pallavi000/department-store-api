import { IsArray, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsArray()
  product: string[];

  @IsString()
  shipping: string;

  @IsString()
  billing: string;

  @IsNumber()
  total: number;

  @IsString()
  payment_method: string;
}
