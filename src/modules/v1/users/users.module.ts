import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './schema/user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UsersModule, UserService],
})
export class UsersModule {}
