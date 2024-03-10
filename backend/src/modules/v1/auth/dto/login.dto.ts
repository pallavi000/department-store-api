import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email of user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '********',
    description: 'current Password',
  })
  @IsString()
  password: string;
}
