import axiosInstance from "../utils/AxiosInstance";

export const fetchAllProductsApi = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const fetchProductByIdApi = async (id: string) => {
  return await axiosInstance.get(`/products/${id}`);
};
