import { IsNumber, IsString } from 'class-validator';

export class CartDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}
