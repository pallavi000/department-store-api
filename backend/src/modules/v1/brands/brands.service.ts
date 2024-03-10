import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './schema/brand.schema';
import { brandDto } from './dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  async fetchAllBrands() {
    const brands = await this.brandModel.find();
    return brands;
  }

  async createBrand(body: brandDto) {
    const brand = await this.brandModel.create({
      ...body,
    });
    return brand;
  }

  async getBrandById(id: string) {
    const brand = await this.brandModel.findById(id);
    return brand;
  }

  async updateBrandById(id: string, data: brandDto) {
    const brand = await this.brandModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
    return brand;
  }

  async deleteBrandById(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id);
    return brand;
  }
}
