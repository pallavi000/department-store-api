import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class categoryDto {
  @ApiProperty({
    example: 'Home & Living',
    description: 'category name',
  })
  @IsString()
  name: string;
}
