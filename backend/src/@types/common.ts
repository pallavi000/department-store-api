import { TAuthUser } from './user';

export interface IExpressRequest extends Request {
  user: TAuthUser;
}
