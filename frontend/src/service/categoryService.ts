import axiosInstance from "../utils/AxiosInstance";

export const fetchCategoriesApi = async () => {
  return await axiosInstance.get("/categories");
};

export const fetchCategoryByIdApi = async (id: string) => {
  return await axiosInstance.get(`/categories/${id}`);
};

export const fetchProductsByCategoryApi = async (id: string) => {
  return await axiosInstance.get(`/products/category/${id}`);
};
