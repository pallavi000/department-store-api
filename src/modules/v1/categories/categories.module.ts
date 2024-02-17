import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryModel } from './schema/category.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [CategoriesService, ConfigService, JwtService],
})
export class CategoriesModule {}
