import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'utils/constant';
import { UserModel } from '../users/schema/user.schema';
import { UserService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([UserModel]),
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: { expiresIn: JWT.EXPIRES_IN },
    }),
  ],
  providers: [AuthService, UserService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
