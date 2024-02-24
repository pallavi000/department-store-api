import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { BrandsService } from './brands.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { brandDto } from './dto/brand.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: brandDto,
    isArray: true,
  })
  @Get('/')
  async getBrand(): Promise<brandDto[]> {
    try {
      const brand = await this.brandService.fetchAllBrands();
      return brand;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post('/')
  async createBrand(@Body() body: brandDto): Promise<brandDto> {
    try {
      const brand = await this.brandService.createBrand(body);
      return brand;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  async getBrandById(@Param('id') brandId: string): Promise<brandDto> {
    try {
      const brand = await this.brandService.getBrandById(brandId);
      return brand;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/:id')
  async updateBrandById(
    @Param('id') brandId: string,
    @Body() body: brandDto,
  ): Promise<brandDto> {
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
