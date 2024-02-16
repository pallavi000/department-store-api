import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { productsDto } from './dto/products.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  async getAllProducts() {
    try {
      const products = await this.productsService.fetchAllProducts();
      return products;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post('/')
  async createProduct(@Body() body: productsDto) {
    try {
      const product = await this.productsService.createProduct(body);
      return product;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') productId: string) {
    try {
      const product = await this.productsService.getProductById(productId);
      return product;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/:id')
  async updateProductById(
    @Param('id') productId: string,
    @Body() body: productsDto,
  ) {
    try {
      const product = await this.productsService.updateProductById(
        productId,
        body,
      );
      return product;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete('/:id')
  async deleteProductById(@Param('id') productId: string) {
    try {
      const product = await this.productsService.deleteProductById(productId);
      return product;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
