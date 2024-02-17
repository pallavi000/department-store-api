import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModel } from './schema/address.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([AddressModel])],
  controllers: [AddressController],
  providers: [AddressService, JwtService, ConfigService],
})
export class AddressModule {}
