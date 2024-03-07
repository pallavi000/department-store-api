import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class orderAddressDto {
  @ApiProperty({
    example: 'name',
    description: 'name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Nepal',
    description: 'name of the country',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Kathmandu',
    description: 'city name',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Baneshor',
    description: 'street name',
  })
  @IsString()
  street: string;

  @ApiProperty({
    example: '+977-98654321',
    description: 'phone number',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '4950',
    description: 'zip code',
  })
  @IsString()
  zip_code: string;

  @ApiProperty({
    example: 'shipping| billing',
    description: 'type of address',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: 'a12345b5432n234x',
    description: 'user Id',
  })
  @IsString()
  user: string;
}
