import { TAddressInput } from "../@types/Address";
import axiosInstance from "../utils/AxiosInstance";

export const addAddressApi = async (data: TAddressInput) => {
  const response = await axiosInstance.post("/address", data);
  return response.data;
};

export const getAddressApi = async () => {
  const response = await axiosInstance.get("/address");
  return response.data;
};
