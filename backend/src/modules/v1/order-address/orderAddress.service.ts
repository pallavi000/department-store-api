import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderAddress } from './schema/orderAddress.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderAddressService {
  constructor(
    @InjectModel(OrderAddress.name)
    private readonly orderAddressModel: Model<OrderAddress>,
  ) {}

  async createOrderAddress(body: any) {
    console.log(body, 'body add');
    const orderAddress = await this.orderAddressModel.create(body);
    return orderAddress;
  }
}
