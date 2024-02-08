import { IsEmail, IsString } from 'class-validator';

export class registerDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
