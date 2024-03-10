import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModel } from './schema/products.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([ProductsModel])],
  providers: [ProductsService, JwtService, ConfigService],
  controllers: [ProductsController],
  exports: [ProductsService, ProductsModule],
})
export class ProductsModule {}
