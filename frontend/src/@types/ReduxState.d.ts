import { TAddress } from "./Address";
import { TCart, TCartInput } from "./Cart";
import { TOrder } from "./Order";
import { TCategory, TProduct } from "./Product";
import { TUser } from "./User";

export type ProductsState = {
  products: TProduct[] | null;
  isLoading: boolean;
  error: string | null;
};

export type ProductState = {
  product: TProduct | null;
  isLoading: boolean;
  error: string | null;
};

export type CategoriesState = {
  categories: TCategory[] | null;
  isLoading: boolean;
  error: string | null;
};

export type CategoryState = {
  category: TCategory | null;
  isLoading: boolean;
  error: string | null;
};

export type CartsState = {
  carts: TCart[];
  isLoading: boolean;
  error: string | null;
  totalOrderQuantity: number;
  totalPrice: number;
};

export type CartState = {
  cart: TCartInput | null;
  isLoading: boolean;
  error: string | null;
};

export type AuthState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  access_token: string | null;
};

export type OrderState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

export type AddressState = {
  addresses: TAddress[];
  isLoading: boolean;
  error: string | null;
};
