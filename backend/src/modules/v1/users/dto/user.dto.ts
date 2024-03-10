import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class userDto {
  @ApiProperty({
    example: 'admin123',
    description: 'username of user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'email Id of user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '********',
    description: 'Password of user',
  })
  @IsString()
  password: string;
}
