import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModel } from './schema/products.schema';

@Module({
  imports: [MongooseModule.forFeature([ProductsModel])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
