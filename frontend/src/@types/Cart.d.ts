import { TProduct } from "./Product";
import { TUser } from "./User";

export type TCart = {
  _id: string;
  product: TProduct;
  quantity: number;
  user: TUser;
  total: number;
};
export type TCartInput = {
  product: string;
  quantity: number;
  user: string;
  total: number;
};
