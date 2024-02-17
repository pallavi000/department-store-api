import { IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  user: string;

  @IsString()
  product: string;

  @IsString()
  shipping: string;

  @IsString()
  billing: string;

  @IsNumber()
  total: number;

  @IsString()
  payment_method: string;
}
