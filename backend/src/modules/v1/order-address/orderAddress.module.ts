import { Module } from '@nestjs/common';
import { OrderAddressController } from './order_address.controller';
import { OrderAddressService } from './orderAddress.service';
import { OrderService } from '../order/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderAddressModel } from './schema/orderAddress.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([OrderAddressModel])],
  controllers: [OrderAddressController],
  providers: [OrderAddressService, JwtService, ConfigService],
  exports: [OrderAddressModule, OrderAddressService],
})
export class OrderAddressModule {}
