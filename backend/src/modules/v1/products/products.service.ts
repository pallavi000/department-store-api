import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/products.schema';
import { Model } from 'mongoose';
import { productsDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productsModel: Model<Product>,
  ) {}

  async fetchAllProducts() {
    const products = await this.productsModel
      .find()
      .populate('category')
      .populate('brand');
    return products;
  }

  async createProduct(body: productsDto) {
    const product = await this.productsModel.create({
      ...body,
    });
    return product;
  }

  async getProductById(id: string) {
    const product = await this.productsModel
      .findById(id)
      .populate('category')
      .populate('brand');
    return product;
  }

  async updateProductById(id: string, data: productsDto) {
    const product = await this.productsModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
    return product;
  }

  async deleteProductById(id: string) {
    const product = await this.productsModel.findByIdAndDelete(id);
    return product;
  }

  async findProductsByCategory(id: string) {
    const products = await this.productsModel
      .find({ category: id })
      .populate('category')
      .populate('brand');
    return products;
  }
}
