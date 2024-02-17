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

  @Post()
  @UseGuards(AuthGuard)
  async createOrUpdate(@Body() body: CartDto, @Req() req: IExpressRequest) {
    try {
      const existingCart = await this.cartService.findExistingCart(
        body.productId,
        req.user._id,
      );
      if (existingCart) {
        const cart = await this.cartService.updateCartQuantity(
          body,
          existingCart._id,
        );
        return cart;
      } else {
        const cart = await this.cartService.createCart(body);
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
