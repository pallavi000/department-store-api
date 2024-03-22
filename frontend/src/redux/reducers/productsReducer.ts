import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsApi } from "../../service/productService";
import { TProduct } from "../../@types/Product";
import { ProductsState } from "../../@types/ReduxState";
import { fetchProductsByCategoryApi } from "../../service/categoryService";

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};
const productsSlice = createSlice({
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
    builder.addCase(fetchProductsByCategoryId.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        error: null,
      };
    });
    builder.addCase(fetchProductsByCategoryId.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || null,
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

export const fetchProductsByCategoryId = createAsyncThunk(
  "fetchProductsByCategory",
  async ({ id }: { id: string }) => {
    try {
      const response = await fetchProductsByCategoryApi(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const {} = productsSlice.actions;
export default productsSlice.reducer;
