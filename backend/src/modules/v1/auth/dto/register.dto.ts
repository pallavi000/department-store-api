import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class registerDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email Id',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'John ',
    description: 'Username',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '********',
    description: 'Password',
  })
  @IsString()
  password: string;
}
