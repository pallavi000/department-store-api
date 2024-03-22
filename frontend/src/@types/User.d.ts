export type TUser = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type TUserUpdate = {
  name: string;
  email: string;
};
