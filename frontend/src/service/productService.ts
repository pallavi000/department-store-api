import axiosInstance from "../utils/AxiosInstance";

export const fetchAllProductsApi = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};
