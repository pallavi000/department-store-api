import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderProductService } from './orderProduct.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiError } from 'src/exceptions/api-error.exception';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrderProduct(@Body() body: any) {
    try {
      const orderProduct =
        await this.orderProductService.createOrderProduct(body);
      return orderProduct;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
