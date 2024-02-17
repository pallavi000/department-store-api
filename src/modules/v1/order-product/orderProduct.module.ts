import { Module } from '@nestjs/common';
import { OrderProductController } from './oderProduct.controller';
import { OrderProductService } from './orderProduct.service';

@Module({
  imports: [],
  controllers: [OrderProductController],
  providers: [OrderProductService],
})
export class OrderProduct {}
