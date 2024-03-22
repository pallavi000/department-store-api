import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TLogin, TRegister } from "../../@types/Auth";
import {
  getCurrentUserApi,
  loginApi,
  registerApi,
} from "../../service/authService";
import { AuthState } from "../../@types/ReduxState";
import persistReducer from "redux-persist/es/persistReducer";
import { authPersistConfig } from "../../utils/reduxPersistConfig";
import { AxiosError } from "axios";
import { TUser } from "../../@types/User";

const initialState: AuthState = {
  user: null,
  error: null,
  access_token: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      return {
        ...state,
        user: null,
        access_token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload, "action payload auth");
      return {
        ...state,
        isLoading: false,
        access_token: action.payload.token,
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
    builder.addCase(
      currentUser.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        // always use typeeee
        return {
          ...state,
          user: action.payload,
          isLoading: false,
        };
      }
    );

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
        isLoading: false,
        access_token: action.payload.token,
        error: null,
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

export const currentUser = createAsyncThunk(
  "currentUser",
  async (_, { dispatch }) => {
    try {
      const response = await getCurrentUserApi();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const code = err.response?.status || 500;
      if (code === 401 || code === 403) {
        dispatch(logout({}));
      }
    }
  }
);

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

const { logout } = authSlice.actions;
export default persistReducer(authPersistConfig, authSlice.reducer);
