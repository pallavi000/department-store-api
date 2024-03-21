import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TLogin, TRegister } from "../../@types/Auth";
import {
  getCurrentUserApi,
  loginApi,
  registerApi,
} from "../../service/authService";
import { AuthState } from "../../@types/ReduxState";
import persistReducer from "redux-persist/es/persistReducer";
import { authPersistConfig } from "../../utils/reduxPersistConfig";

const initialState: AuthState = {
  user: null,
  error: null,
  auth_token: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        auth_token: action.payload.token,
        user: action.payload.user,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage ? errorMessage : null,
      };
    });
    builder.addCase(currentUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
      };
    });

    builder.addCase(currentUser.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage ? errorMessage : null,
      };
    });

    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: true,
        access_token: action.payload.token,
      };
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage || null,
      };
    });
  },
});

export const loginUser = createAsyncThunk("loginUser", async (data: TLogin) => {
  try {
    const response = await loginApi(data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const currentUser = createAsyncThunk("currentUser", async () => {
  try {
    const response = await getCurrentUserApi();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data: TRegister) => {
    try {
      const response = await registerApi(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default persistReducer(authPersistConfig, authSlice.reducer);
