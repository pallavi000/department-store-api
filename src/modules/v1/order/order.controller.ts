import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiError } from 'src/exceptions/api-error.exception';
import { IExpressRequest } from 'src/@types/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductsService } from '../products/products.service';
import { OrderProductService } from '../order-product/orderProduct.service';
import { OrderAddressService } from '../order-address/orderAddress.service';
import { AddressService } from '../address/address.service';
import { CartService } from '../cart/cart.service';

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

  @Get()
  async findAllOrder() {
    try {
      const orders = await this.orderService.findAllOrder();
      return orders;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Body() body: any, @Req() req: IExpressRequest) {
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

      //order-address-create
      const shipping = await this.orderAddressService.createOrderAddress({
        type: 'shipping',
        ...shippingAddress,
        user: req.user._id,
      });
      const billing = await this.orderAddressService.createOrderAddress({
        type: 'billing',
        ...billingAddress,
        user: req.user._id,
      });
      console.log(billing, shipping);

      //order-products
      for (const cart of body.carts) {
        console.log(cart, body.carts, 'cart');
        const cartItem = await this.cartService.findCartItemsByUserId(
          cart,
          req.user._id,
        );
        console.log(cartItem);
        const product = await this.productService.getProductById(
          cartItem.product.toString(),
        );
        const op = await this.orderProductService.createOrderProduct({
          ...product,
          quantity: cartItem.quantity,
          user: cartItem.user,
          product: product._id,
        });
        orderProductIds.push(op._id);
      }

      //order-create
      const order = await this.orderService.createOrder({
        ...body,
        product: orderProductIds,
        shipping: shipping._id,
        billing: billing._id,
        user: req.user._id,
      });

      return order;
    } catch (error) {
      throw new ApiError(error);
    }
  }
}
