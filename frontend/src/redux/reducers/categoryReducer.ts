import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../../@types/ReduxState";
import { fetchCategoryByIdApi } from "../../service/categoryService";

const initialState: CategoryState = {
  category: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryById.pending, (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        category: action.payload,
        error: null,
      };
    });
    builder.addCase(fetchCategoryById.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage ? errorMessage : null,
      };
    });
  },
});

export const fetchCategoryById = createAsyncThunk(
  "fetchCategoryById",
  async ({ id }: { id: string }) => {
    try {
      const response = await fetchCategoryByIdApi(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default categorySlice.reducer;
