import { TProduct } from "./Product";

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
