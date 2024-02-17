import { IsNumber, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsNumber()
  zip_code: number;

  @IsString()
  street: string;

  @IsNumber()
  phone: number;
}
