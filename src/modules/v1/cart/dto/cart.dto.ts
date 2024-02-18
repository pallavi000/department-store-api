import { IsNumber, IsString } from 'class-validator';

export class CartDto {
  @IsString()
  user: string;

  @IsString()
  product: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}
