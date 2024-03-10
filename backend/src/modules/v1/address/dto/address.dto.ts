import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty({
    example: 'Finland',
    description: 'Name  of Country',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Tikkurila',
    description: 'Name  of City',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: '01300',
    description: 'Zip Code',
  })
  @IsNumber()
  zip_code: number;

  @ApiProperty({
    example: 'vacklinn',
    description: 'Name  of street',
  })
  @IsString()
  street: string;

  @ApiProperty({
    example: '358-04698654',
    description: 'Phone no  of Author',
  })
  @IsNumber()
  phone: number;
}
