import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';

import { ApiError } from 'src/exceptions/api-error.exception';
import { UserService } from '../users/users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { userDto } from '../users/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: registerDto,
  })
  @Post('/register')
  async register(@Body() body: registerDto) {
    try {
      const hashPassword = await this.userService.generateHash(body.password);
      const user = await this.userService.createUser({
        ...body,
        password: hashPassword,
      });

      const { password, ...payload } = user;
      const token = this.authService.generateToken(payload);
      return { token, user: payload };
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: loginDto,
  })
  @Post('/login')
  async login(@Body() body: loginDto) {
    try {
      const user = await this.userService.findUserByEmail(body.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const validUser = await this.authService.comparePassword(
        body.password,
        user.password,
      );
      if (!validUser) {
        throw new BadRequestException('Invalid Password');
      }
      const { password, ...payload } = user.toObject();

      const token = this.authService.generateToken(payload);
      return { token, user: payload };
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: userDto,
  })
  @Get('/profile')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: any) {
    try {
      console.log('user api');
      const user = await this.userService.getUserById(req.user._id);

      return user;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
