import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { IExpressRequest } from 'src/@types/common';
import { ApiError } from 'src/exceptions/api-error.exception';
import mongoose from 'mongoose';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCartsByUser(@Req() req: IExpressRequest) {
    try {
      const carts = await this.cartService.findCartsByUserId(req.user._id);
      return carts;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findCartById(@Param('id') cartId: string, @Req() req: IExpressRequest) {
    try {
      const cart = await this.cartService.findCartItemsByUserId(
        cartId,
        req.user._id,
      );
      return cart;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/order')
  @UseGuards(AuthGuard)
  async findCartItemByUserId(
    @Body() cartId: string,
    @Req() req: IExpressRequest,
  ) {
    try {
      const cart = await this.cartService.findCartItemsByUserId(
        cartId,
        req.user._id,
      );
      return cart;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createOrUpdate(@Body() body: CartDto, @Req() req: IExpressRequest) {
    try {
      const existingCart = await this.cartService.findExistingCart(
        body.product,
        req.user._id,
      );
      if (existingCart) {
        const exitCart = await this.cartService.updateCartQuantity(
          { ...body, user: req.user._id },
          existingCart._id,
        );
        return exitCart;
      } else {
        const cart = await this.cartService.createCart({
          ...body,
          user: req.user._id,
        });
        return cart;
      }
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCart(@Req() req: IExpressRequest, @Param('id') cartId: string) {
    try {
      const cart = await this.cartService.removeCart(cartId, req.user._id);
      return cart;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
