import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';
import { IExpressRequest } from 'src/@types/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiError } from 'src/exceptions/api-error.exception';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAddress(@Req() req: IExpressRequest) {
    try {
      const address = await this.addressService.findAddress();
      return address;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createAddress(@Body() body: any, @Req() req: IExpressRequest) {
    try {
      const address = await this.addressService.createAddress(
        body,
        req.user._id,
      );
      return address;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateAddress(
    @Param('id') addressId: string,
    @Body() body: AddressDto,
  ) {
    try {
      const address = await this.addressService.updateAddress(addressId, body);
      return address;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeAddress(@Param('id') addressId: string) {
    try {
      const address = await this.addressService.deleteAddress(addressId);
      return address;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
