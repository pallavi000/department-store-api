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
    const cart = await this.cartModel.create({
      quantity: body.quantity,
      total: body.total,
      product: body.product,
      user: body.user,
    });
    return cart;
  }

  async findExistingCart(product: string, user: string) {
    const cart = await this.cartModel
      .findOne({ product: product, user: user })
      .populate('product');

    return cart;
  }

  async findCartItemsByUserId(cartId: string, userId: string) {
    console.log(cartId, userId);
    const cart = await this.cartModel
      .findOne({ _id: cartId, user: userId })
      .populate('product');

    return cart;
  }

  async updateCartQuantity(body: CartDto, cartId: mongoose.Types.ObjectId) {
    const cart = await this.cartModel
      .findByIdAndUpdate(
        cartId,
        {
          quantity: body.quantity,
          total: body.total,
        },
        { new: true },
      )
      .populate('product');
    return cart;
  }

  async removeCart(cartId: string, userId: string) {
    const cart = await this.cartModel.findOneAndDelete({
      _id: cartId,
      user: userId,
    });
    return cart;
  }
}
