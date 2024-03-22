import { TCart } from "./Cart";
import { TUser } from "./user";

export type TAuthContextStates = {
  carts: TCart[];
  setCarts: Function;
};
