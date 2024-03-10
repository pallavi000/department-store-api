import { Module } from '@nestjs/common';
import { OrderProductController } from './oderProduct.controller';
import { OrderProductService } from './orderProduct.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderProductModel } from './schema/order-product.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([OrderProductModel])],
  controllers: [OrderProductController],
  providers: [OrderProductService, JwtService, ConfigService],
  exports: [OrderProductModule, OrderProductService],
})
export class OrderProductModule {}
