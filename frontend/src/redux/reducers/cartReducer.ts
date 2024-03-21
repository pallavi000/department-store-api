import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TCartInput } from "../../@types/Cart";
import { addToCartApi } from "../../service/cartService";
import { CartState } from "../../@types/ReduxState";

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    });

    builder.addCase(addToCart.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage ? errorMessage : null,
      };
    });
  },
});

export const addToCart = createAsyncThunk(
  "addToCart",
  async (data: TCartInput) => {
    try {
      const response = await addToCartApi(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export default cartSlice.reducer;
