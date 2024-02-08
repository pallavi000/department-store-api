import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './schema/user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
