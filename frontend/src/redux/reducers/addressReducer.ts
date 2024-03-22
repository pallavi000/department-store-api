import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddressApi, getAddressApi } from "../../service/addressService";
import { AddressState } from "../../@types/ReduxState";
import { TAddressInput } from "../../@types/Address";

const initialState: AddressState = {
  addresses: [],
  isLoading: false,
  error: null,
};
const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        addresses: action.payload,
        error: null,
      };
    });

    builder.addCase(fetchAddress.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || null,
      };
    });

    builder.addCase(addAddress.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        addresses: [...state.addresses, action.payload],
        error: null,
      };
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || null,
      };
    });
  },
});

export const fetchAddress = createAsyncThunk("fetchAddress", async () => {
  try {
    const response = await getAddressApi();
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addAddress = createAsyncThunk(
  "addAddress",
  async (data: TAddressInput) => {
    try {
      const response = await addAddressApi(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export default addressSlice.reducer;
