import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async fetchAllUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async createUser(body: userDto) {
    const user = await this.userModel.create({
      ...body,
    });
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async updateUserById(id: string, data: userDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
}
