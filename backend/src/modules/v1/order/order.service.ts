import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async findAllOrder() {
    const orders = await this.orderModel
      .find()
      .populate('product')
      .populate('shipping')
      .populate('billing');
    return orders;
  }

  async findOrderByUserId(userId: string) {
    const orders = await this.orderModel
      .find({ user: userId })
      .populate('product')
      .populate('shipping')
      .populate('billing');
    return orders;
  }

  async createOrder(body: OrderDto, orderProductIds: string[], userId: string) {
    const order = await this.orderModel.create({
      ...body,
      products: orderProductIds,
      user: userId,
    });
    return order;
  }
}
