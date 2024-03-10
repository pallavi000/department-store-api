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

import { userDto } from './dto/user.dto';
import { UserService } from './users.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: userDto,
    isArray: true,
  })
  @Get('/')
  async getUser() {
    try {
      const user = await this.userService.fetchAllUsers();
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: userDto,
    isArray: false,
  })
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

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: userDto,
    isArray: false,
  })
  @Get('/:id')
  async getUserById(@Param('id') userId: string) {
    try {
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: userDto,
    isArray: false,
  })
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

  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    type: userDto,
    isArray: false,
  })
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
