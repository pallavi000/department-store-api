export type TProduct = {
  brand: TBrand;
  category: TCategory;
  detail: string;
  name: string;
  price: number;
  quantity: number;
  review: string[];
  _id: string;
};

export type TBrand = {
  name: string;
  detail: string;
  _id: string;
};

export type TCategory = {
  _id: string;
  name: string;
};
