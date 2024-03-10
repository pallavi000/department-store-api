import axios from "axios";
import { TLogin, TRegister } from "../@types/Auth";

export const registerApi = async (data: TRegister) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/auth/register",
    data
  );
  return response.data;
};

export const loginApi = async (data: TLogin) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/auth/register",
    data
  );
  return response.data;
};
