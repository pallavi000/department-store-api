import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { IExpressRequest } from 'src/@types/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductsService } from '../products/products.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductsService,
  ) {}

  @Get()
  async findAllOrder() {
    try {
      const orders = await this.orderService.findAllOrder();
      return orders;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Body() body: any, @Req() req: IExpressRequest) {
    try {
      const product = await this.productService.getProductById(body.product);
      if (!product || product.quantity === 0) {
        throw new ApiError('product out of stock');
      }

      const order = this.orderService.createOrder(body);
      return order;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
