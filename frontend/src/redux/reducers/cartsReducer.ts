import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

//types
import { CartsState } from "../../@types/ReduxState";
import { TCart, TCartInput } from "../../@types/Cart";

//api call
import {
  addToCartApi,
  deleteCartApi,
  getCartsApi,
} from "../../service/cartService";

//persist config
import { cartPersistConfig } from "../../utils/reduxPersistConfig";

//get Total amount of cartItems
function calculateTotalPrice(carts: TCart[]) {
  const total = carts.reduce((accumulator, cart) => {
    return Number(accumulator) + Number(cart.total);
  }, 0);
  return total;
}

function calculateTotalQuantity(carts: TCart[]) {
  const total = carts.reduce((accumulator, cart) => {
    return accumulator + cart.quantity;
  }, 0);
  return total;
}

const initialState: CartsState = {
  isLoading: false,
  carts: [],
  error: null,
  totalOrderQuantity: 0,
  totalPrice: 0,
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    updateCartQuantity: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (cart) => cart._id === action.payload._id
      );
      if (itemIndex !== -1) {
        state.carts[itemIndex] = action.payload;
      }
      state.totalPrice = calculateTotalPrice(state.carts);
      state.totalOrderQuantity = calculateTotalQuantity(state.carts);
      return state;
    },
  },
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
        error: null,
        totalOrderQuantity: calculateTotalQuantity(action.payload),
        totalPrice: calculateTotalPrice(action.payload),
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

    builder.addCase(addToCart.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      const cartItems = [...state.carts, action.payload];
      return {
        ...state,
        carts: cartItems,
        isLoading: false,
        error: null,
        totalOrderQuantity: calculateTotalQuantity(cartItems),
        totalPrice: calculateTotalPrice(cartItems),
      };
    });

    builder.addCase(addToCart.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || null,
      };
    });

    builder.addCase(updateCartItem.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      updateCartItem.fulfilled,
      (state, action: PayloadAction<TCart>) => {
        state.isLoading = false;
        state.error = null;
        return state;
      }
    );
    builder.addCase(updateCartItem.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(removeCartById.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      removeCartById.fulfilled,
      (state, action: PayloadAction<any>) => {
        const cartItems = state.carts.filter(
          (cart) => cart._id !== action.payload
        );
        return {
          ...state,
          isLoading: false,
          carts: cartItems,
          totalOrderQuantity: calculateTotalQuantity(cartItems),
          totalPrice: calculateTotalPrice(cartItems),
          error: null,
        };
      }
    );
    builder.addCase(removeCartById.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || null,
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

export const updateCartItem = createAsyncThunk(
  "updateCartItem",
  async (data: TCartInput) => {
    try {
      const response = await addToCartApi(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCartById = createAsyncThunk(
  "removeCartById",
  async (id: string) => {
    try {
      await deleteCartApi(id);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const { updateCartQuantity } = cartsSlice.actions;
export default persistReducer(cartPersistConfig, cartsSlice.reducer);
