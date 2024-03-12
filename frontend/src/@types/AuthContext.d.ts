import { TCart } from "./Cart";
import { TUser } from "./user";

export type TAuthContextStates = {
  user: TUser | null;
  token: string;
  setToken: (value: string) => void;
  carts: TCart[];
  setCarts: Function;
};
