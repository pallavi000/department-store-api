import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { categoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  async getAllCategories() {
    try {
      const categories = await this.categoriesService.fetchAllCategories();
      return categories;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post('/')
  async createCategory(@Body() body: categoryDto) {
    try {
      const category = await this.categoriesService.createCategory(body);
      return category;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  async getCategoryById(@Param('id') categoryId: string) {
    try {
      const category = await this.categoriesService.getCategoryById(categoryId);
      return category;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/:id')
  async updateCategoryById(
    @Param('id') categoryId: string,
    @Body() body: categoryDto,
  ) {
    try {
      const category = await this.categoriesService.updateCategoryById(
        categoryId,
        body,
      );
      return category;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete('/:id')
  async deleteCategoryById(@Param('id') categoryId: string) {
    try {
      const category =
        await this.categoriesService.deleteCategoryById(categoryId);
      return category;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
