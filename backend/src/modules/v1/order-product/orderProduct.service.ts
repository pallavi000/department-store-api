import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderProduct, OrderProductModel } from './schema/order-product.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectModel(OrderProductModel.name)
    private readonly orderProductModel: Model<OrderProduct>,
  ) {}

  async createOrderProduct(body: any) {
    const orderProduct = await this.orderProductModel.create(body);
    return orderProduct;
  }
}
