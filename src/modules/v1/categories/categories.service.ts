import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { categoryDto } from './dto/category.dto';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async fetchAllCategories() {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async createCategory(body: categoryDto) {
    const category = await this.categoryModel.create({
      ...body,
    });
    return category;
  }

  async getCategoryById(id: string) {
    const category = await this.categoryModel.findById(id);
    return category;
  }

  async updateCategoryById(id: string, data: categoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
    return category;
  }

  async deleteCategoryById(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    return category;
  }
}
