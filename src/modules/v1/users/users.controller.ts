import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { userDto } from './dto/user.dto';
import { UserService } from './users.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUser() {
    try {
      const user = await this.userService.fetchAllUsers();
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async createUser(@Body() body: userDto) {
    try {
      const user = await this.userService.createUser(body);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') userId: string) {
    try {
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateUserById(@Param('id') userId: string, @Body() body: userDto) {
    try {
      const user = await this.userService.updateUserById(userId, body);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteUserById(@Param('id') userId: string) {
    try {
      const user = await this.userService.deleteUserById(userId);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
