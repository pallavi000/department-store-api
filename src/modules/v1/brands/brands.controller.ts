import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { BrandsService } from './brands.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { brandDto } from './dto/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get('/')
  async getBrand() {
    try {
      const brand = await this.brandService.fetchAllBrands();
      return brand;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post('/')
  async createBrand(@Body() body: brandDto) {
    try {
      const brand = await this.brandService.createBrand(body);
      return brand;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  async getBrandById(@Param('id') brandId: string) {
    try {
      const brand = await this.brandService.getBrandById(brandId);
      return brand;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/:id')
  async updateBrandById(@Param('id') brandId: string, @Body() body: brandDto) {
    try {
      const brand = await this.brandService.updateBrandById(brandId, body);
      return brand;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete('/:id')
  async deleteBrandById(@Param('id') brandId: string) {
    try {
      const brand = await this.brandService.deleteBrandById(brandId);
      return brand;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
