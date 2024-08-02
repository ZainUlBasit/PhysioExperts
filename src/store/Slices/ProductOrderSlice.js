import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllProductOrderApi } from "../../Api_Requests/Api_Requests";

export const fetchProductsOrders = createAsyncThunk(
  "fetch-Products-Order",
  async () => {
    try {
      const response = await GetAllProductOrderApi();
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const ProductOrderSlice = createSlice({
  name: "Products-Order",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchProductsOrders.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ProductOrderSlice.reducer;
