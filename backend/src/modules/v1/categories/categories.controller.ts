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

import { CategoriesService } from './categories.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { categoryDto } from './dto/category.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: categoryDto,
    isArray: true,
  })
  @Get('/')
  async getAllCategories() {
    try {
      const categories = await this.categoriesService.fetchAllCategories();
      return categories;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: categoryDto,
    isArray: true,
  })
  @ApiBearerAuth()
  @Post('/')
  @UseGuards(AuthGuard)
  async createCategory(@Body() body: categoryDto) {
    try {
      const category = await this.categoriesService.createCategory(body);
      return category;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: categoryDto,
  })
  @Get('/:id')
  async getCategoryById(@Param('id') categoryId: string) {
    try {
      const category = await this.categoriesService.getCategoryById(categoryId);
      return category;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: categoryDto,
  })
  @ApiBearerAuth()
  @Put('/:id')
  @UseGuards(AuthGuard)
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

  @ApiResponse({
    status: 204,
    type: categoryDto,
  })
  @ApiBearerAuth()
  @Delete('/:id')
  @UseGuards(AuthGuard)
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
