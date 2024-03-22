import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { productsDto } from './dto/products.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: productsDto,
    isArray: true,
  })
  @Get('/')
  async getAllProducts() {
    try {
      const products = await this.productsService.fetchAllProducts();
      return products;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: productsDto,
  })
  @Post('/')
  @UseGuards(AuthGuard)
  async createProduct(@Body() body: productsDto) {
    try {
      const product = await this.productsService.createProduct(body);
      return product;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: productsDto,
    isArray: false,
  })
  @Get('/:id')
  async getProductById(@Param('id') productId: string) {
    try {
      const product = await this.productsService.getProductById(productId);
      return product;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: productsDto,
  })
  @Put('/:id')
  @UseGuards(AuthGuard)
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

  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    type: productsDto,
  })
  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteProductById(@Param('id') productId: string) {
    try {
      const product = await this.productsService.deleteProductById(productId);
      return product;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/category/:id')
  async getProductsByCategoryId(@Param('id') categoryId: string) {
    try {
      const products =
        await this.productsService.findProductsByCategory(categoryId);
      return products;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
