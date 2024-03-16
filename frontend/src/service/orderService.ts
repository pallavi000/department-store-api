import { TOrderInput } from "../@types/Order";
import axiosInstance from "../utils/AxiosInstance";

export const createOrderApi = async (data: TOrderInput) => {
  return await axiosInstance.post("/orders", data);
};
