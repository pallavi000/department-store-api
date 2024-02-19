import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { OrderAddressModule } from './order-address/orderAddress.module';
import { OrderProductModule } from './order-product/orderProduct.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
    }),
    ConfigModule.forRoot(),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    AuthModule,
    CartModule,
    AddressModule,
    OrderModule,
    OrderAddressModule,
    OrderProductModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class V1Module {}
