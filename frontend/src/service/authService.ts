import axios from "axios";
import { TLogin, TRegister } from "../@types/Auth";
import axiosInstance from "../utils/AxiosInstance";
import { TUser, TUserUpdate } from "../@types/User";

export const registerApi = async (data: TRegister) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response;
};

export const loginApi = async (data: TLogin) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response;
};

export const getCurrentUserApi = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response;
};

export const updateUserProfileApi = async ({
  id,
  data,
}: {
  id: string;
  data: TUserUpdate;
}) => {
  const response = await axiosInstance.put(`/users/${id}`, data);
  return response;
};
