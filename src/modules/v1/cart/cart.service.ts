import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schema/cart.schema';
import mongoose, { Model } from 'mongoose';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  async findCartsByUserId(userId: string) {
    const carts = await this.cartModel
      .find({ user: userId })
      .populate('product')
      .populate('user');
    return carts;
  }

  async createCart(body: CartDto) {
    const cart = await this.cartModel.create(body);
    return cart;
  }

  async findExistingCart(product: string, user: string) {
    const cart = await this.cartModel.findOne({ product: product, user: user });
    return cart;
  }

  async updateCartQuantity(body: CartDto, cartId: mongoose.Types.ObjectId) {
    const cart = await this.cartModel.updateOne(
      { _id: cartId },
      {
        quantity: body.quantity,
      },
    );
    return cart;
  }

  async removeCart(cartId: string, userId: string) {
    const cart = await this.cartModel.deleteOne({ _id: cartId, user: userId });
    return cart;
  }
}