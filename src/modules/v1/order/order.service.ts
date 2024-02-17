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
    const orders = await this.orderModel.find();
    return orders;
  }

  async createOrder(body: OrderDto) {
    const order = await this.orderModel.create(body);
    return order;
  }
}
