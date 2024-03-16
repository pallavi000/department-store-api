import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsApi } from "../../service/productService";
import { TProduct } from "../../@types/Product";
import { ProductState } from "../../@types/ReduxState";

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        products: action.payload,
      };
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage ? errorMessage : null,
      };
    });
  },
});

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const data = await fetchAllProductsApi();
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const {} = productSlice.actions;
export default productSlice.reducer;
