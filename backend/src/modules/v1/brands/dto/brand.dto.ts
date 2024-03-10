import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class brandDto {
  @ApiProperty({
    example: 'Zara',
    description: 'Name  of Brand',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'A trustable brand of all time',
    description: 'Brand Details',
  })
  @IsString()
  detail: string;
}
