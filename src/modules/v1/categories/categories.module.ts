import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryModel } from './schema/category.schema';

@Module({
  imports: [MongooseModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
