import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CartDto {
  @ApiProperty({
    example: '2567890dfg',
    description: 'current userId',
  })
  @IsString()
  user: string;

  @ApiProperty({
    example: '123456sdf',
    description: 'product Id',
  })
  @IsString()
  product: string;

  @ApiProperty({
    example: 3,
    description: 'quantity of product',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 200,
    description: 'total amount to pay',
  })
  @IsNumber()
  total: number;
}
