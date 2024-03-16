import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductByIdApi } from "../../service/productService";
import { ProductState } from "../../@types/ReduxState";

const initialState: ProductState = {
  product: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        error: null,
      };
    });

    builder.addCase(fetchProductById.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage ? errorMessage : null,
      };
    });
  },
});

export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async ({ id }: { id: string }) => {
    try {
      const response = await fetchProductByIdApi(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default productSlice.reducer;
