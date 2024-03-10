import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel } from './schema/order.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';
import { OrderProductModule } from '../order-product/orderProduct.module';
import { OrderAddressModule } from '../order-address/orderAddress.module';
import { AddressModule } from '../address/address.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    MongooseModule.forFeature([OrderModel]),
    ProductsModule,
    OrderProductModule,
    OrderAddressModule,
    AddressModule,
    CartModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtService, ConfigService],
})
export class OrderModule {}
