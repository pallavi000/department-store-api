import { ClassSerializerInterceptor, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    console.log(password, hashPassword);
    const isRightPassword = await bcrypt.compare(password, hashPassword);
    if (!isRightPassword) {
      return false;
    }
    return true;
  }
}
