import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class productsDto {
  @ApiProperty({
    example: 'Power bank',
    description: 'Name of Product',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '48 hour power keeping',
    description: 'Details of the product ',
  })
  @IsString()
  detail: string;

  @ApiProperty({
    example: 500,
    description: 'Price of the product ',
  })
  @IsString()
  price: number;

  @ApiProperty({
    example: 100,
    description: 'Stock of product',
  })
  @IsString()
  quantity: number;

  @ApiProperty({
    example: '2a5678d987bz98',
    description: 'Category Id of product ',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: 'a987654w45678s',
    description: 'Brand Id of product',
  })
  @IsString()
  brand: string;

  @ApiProperty({
    example: 'a987654w45678s',
    description: 'Review Ids of product',
  })
  @IsArray()
  review: string[];

  @ApiProperty({
    example: '2025-01-01',
    description: 'Expiry date of product',
  })
  @IsString()
  expiry_date: string;
}
