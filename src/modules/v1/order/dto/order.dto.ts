import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @ApiProperty({
    example: '761234565a45b',
    description: 'shipping address Id',
  })
  @IsString()
  shipping: string;

  @ApiProperty({
    example: '761234565a45b',
    description: 'billing address Id',
  })
  @IsString()
  billing: string;

  @ApiProperty({
    example: 500,
    description: 'total amount of order',
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    example: 'Stripe',
    description: 'payment method',
  })
  @IsString()
  payment_method: string;

  @ApiProperty({
    example: ['1234565a3b2'],
    description: 'cart Ids',
  })
  @IsArray()
  carts: string[];
}
