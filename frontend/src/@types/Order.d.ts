import { TAddress } from "./Address";

export type TOrderInput = {
  shipping: string;
  billing: string;
  carts: string[];
  total: number;
  payment_method: string;
};

export type TOrder = {
  user: string;
  product: TProduct[];
  payment_method: string;
  shipping: TAddress;
  billing: TAddress;
  total: number;
  _id: string;
};
