import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './schema/user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService, JwtService, ConfigService],
  exports: [UsersModule, UserService],
})
export class UsersModule {}
