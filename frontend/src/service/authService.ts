import axios from "axios";
import { TLogin, TRegister } from "../@types/Auth";
import axiosInstance from "../utils/AxiosInstance";
import { TUser } from "../@types/User";

export const registerApi = async (data: TRegister) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginApi = async (data: TLogin) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};
