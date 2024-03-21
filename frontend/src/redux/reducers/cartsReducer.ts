import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartsState } from "../../@types/ReduxState";
import { getCartsApi } from "../../service/cartService";

const initialState: CartsState = {
  isLoading: false,
  carts: [],
  error: null,
};
const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCarts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAllCarts.fulfilled, (state, action) => {
      return {
        ...state,
        carts: action.payload,
        isLoading: false,
      };
    });
    builder.addCase(fetchAllCarts.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage ? errorMessage : null,
      };
    });
  },
});

export const fetchAllCarts = createAsyncThunk("fetchAllCarts", async () => {
  try {
    const carts = await getCartsApi();
    return carts;
  } catch (error) {
    console.log(error);
  }
});

export default cartsSlice.reducer;
