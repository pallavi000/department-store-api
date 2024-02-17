import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderAddressService } from './orderAddress.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiError } from 'src/exceptions/api-error.exception';

@Controller('order-address')
export class OrderAddressController {
  constructor(private readonly orderAddressService: OrderAddressService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrderAddress(@Body() body: any) {
    try {
      const orderAddress =
        await this.orderAddressService.createOrderAddress(body);
      return orderAddress;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
