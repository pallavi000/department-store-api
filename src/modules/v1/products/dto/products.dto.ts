import { IsArray, IsString } from 'class-validator';

export class productsDto {
  @IsString()
  name: string;

  @IsString()
  detail: string;

  @IsString()
  price: number;

  @IsString()
  quantity: number;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @IsArray()
  review: string[];

  @IsString()
  expiry_date: string;
}
