import { IsEmail, IsString } from 'class-validator';

export class brandDto {
  @IsString()
  name: string;

  @IsString()
  detail: string;
}
