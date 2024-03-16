import { TCategory, TProduct } from "./Product";

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
