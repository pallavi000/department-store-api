import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { IExpressRequest } from 'src/@types/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductsService } from '../products/products.service';
import { OrderProductService } from '../order-product/orderProduct.service';
import { OrderAddressService } from '../order-address/orderAddress.service';
import { AddressService } from '../address/address.service';
import { CartService } from '../cart/cart.service';
import { OrderDto } from './dto/order.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductsService,
    private readonly orderProductService: OrderProductService,
    private readonly orderAddressService: OrderAddressService,
    private readonly addressService: AddressService,
    private readonly cartService: CartService,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderDto,
    isArray: true,
  })
  @Get()
  async findAllOrder() {
    try {
      const orders = await this.orderService.findAllOrder();
      return orders;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderDto,
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @Get('/user')
  async findOrderByUser(@Req() req: IExpressRequest) {
    try {
      console.log(req.user, 'useriddd');
      const orders = await this.orderService.findOrderByUserId(req.user._id);
      return orders;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: OrderDto,
  })
  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Body() body: OrderDto, @Req() req: IExpressRequest) {
    console.log(body);
    let orderProductIds = [];
    try {
      const shippingAddress = await this.addressService.findAddressById(
        body.shipping,
      );
      if (!shippingAddress) {
        throw new ApiError('Invalid shipping Id');
      }
      const billingAddress = await this.addressService.findAddressById(
        body.billing,
      );
      if (!billingAddress) {
        throw new ApiError('Invalid billing Id');
      }
      const { _id: shippingId, ...shippingData } = shippingAddress.toObject();
      const { _id: billingId, ...billingData } = billingAddress.toObject();
      //order-address-create
      const shipping = await this.orderAddressService.createOrderAddress({
        type: 'shipping',
        ...shippingData,
        user: req.user._id,
      });
      const billing = await this.orderAddressService.createOrderAddress({
        type: 'billing',
        ...billingData,
        user: req.user._id,
      });

      //order-products
      for (const cart of body.carts) {
        console.log(cart, 'cart');
        const cartItem = await this.cartService.findCartItemsByUserId(
          cart,
          req.user._id,
        );
        console.log(cartItem);
        const product = await this.productService.getProductById(
          cartItem.product._id.toString(),
        );
        console.log(product, 'product');
        const { _id, ...productData } = product.toObject();
        const op = await this.orderProductService.createOrderProduct({
          ...productData,
          quantity: cartItem.quantity,
          user: cartItem.user,
          product: product._id,
          image: 'xx',
        });
        orderProductIds.push(op._id);
        await this.cartService.removeCart(cart, req.user._id);
      }

      //order-create
      const order = await this.orderService.createOrder(
        {
          ...body,
          shipping: shipping._id.toString(),
          billing: billing._id.toString(),
        },
        orderProductIds,
        req.user._id,
      );

      return order;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
