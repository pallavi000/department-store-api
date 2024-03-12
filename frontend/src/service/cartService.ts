import { TCartInput } from "../@types/Cart";
import axiosInstance from "../utils/AxiosInstance";

export const addToCartApi = async (data: TCartInput) => {
  const response = await axiosInstance.post("/carts", data);
  return response.data;
};

export const getCartsApi = async () => {
  const response = await axiosInstance.get("/carts");
  return response.data;
};

export const deleteCartApi = async (id: string) => {
  const response = await axiosInstance.delete(`/carts/${id}`);
  return response.data;
};
