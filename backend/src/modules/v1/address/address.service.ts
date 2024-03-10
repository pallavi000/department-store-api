import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schema/address.schema';
import { Model } from 'mongoose';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
  ) {}
  async findAddress() {
    const address = await this.addressModel.find();
    return address;
  }

  async createAddress(body: AddressDto, user: string) {
    const address = await this.addressModel.create({ ...body, user });
    return address;
  }

  async updateAddress(addressId: string, body: AddressDto) {
    const address = await this.addressModel.findByIdAndUpdate(
      addressId,
      { ...body },
      { new: true },
    );
    return address;
  }

  async deleteAddress(addressId: string) {
    const address = await this.addressModel.deleteOne({ id: addressId });
    return address;
  }

  async findAddressById(addressId: string) {
    const address = await this.addressModel.findById(addressId);
    return address;
  }
}
