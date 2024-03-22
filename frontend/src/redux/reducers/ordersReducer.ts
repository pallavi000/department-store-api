import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderState } from "../../@types/ReduxState";
import { getOrdersByUserIdApi } from "../../service/orderService";

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderByUserId.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchOrderByUserId.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
        error: null,
      };
    });
    builder.addCase(fetchOrderByUserId.rejected, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: action.error.message || null,
      };
    });
  },
});

export const fetchOrderByUserId = createAsyncThunk(
  "fetchOrderByUserId",
  async () => {
    try {
      const response = await getOrdersByUserIdApi();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default ordersSlice.reducer;
