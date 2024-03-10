import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandModel } from './schema/brand.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([BrandModel])],
  controllers: [BrandsController],
  providers: [BrandsService, ConfigService, JwtService],
})
export class BrandsModule {}
