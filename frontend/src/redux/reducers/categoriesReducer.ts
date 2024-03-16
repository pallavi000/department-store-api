import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategoriesApi } from "../../service/categoryService";
import { CategoriesState } from "../../@types/ReduxState";

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
        error: null,
      };
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      const errorMessage = action.error.message;
      return {
        ...state,
        isLoading: false,
        error: errorMessage ? errorMessage : null,
      };
    });
  },
});

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    try {
      const response = await fetchCategoriesApi();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default categoriesSlice.reducer;
