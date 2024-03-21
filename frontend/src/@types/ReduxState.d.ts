import { TCart, TCartInput } from "./Cart";
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
  carts: TCart[] | null;
  isLoading: boolean;
  error: string | null;
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
  auth_token: string | null;
};
