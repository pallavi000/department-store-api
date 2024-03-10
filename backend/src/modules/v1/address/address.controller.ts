import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: AddressDto,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard)
  async findAddress(@Req() req: IExpressRequest): Promise<AddressDto[]> {
    try {
      const address = await this.addressService.findAddress();
      return address;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: AddressDto,
    isArray: false,
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  async findAddressById(@Param('id') userId: string): Promise<AddressDto> {
    try {
      const address = await this.addressService.findAddressById(userId);
      return address;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AddressDto,
    isArray: false,
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async createAddress(@Body() body: AddressDto, @Req() req: IExpressRequest) {
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

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AddressDto,
    isArray: false,
  })
  @ApiBearerAuth()
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

  @ApiResponse({
    status: 204,
  })
  @ApiBearerAuth()
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
