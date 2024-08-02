import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllProductApi } from "../../Api_Requests/Api_Requests";

export const fetchProducts = createAsyncThunk("fetch-Products", async () => {
  try {
    const response = await GetAllProductApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const ProductSlice = createSlice({
  name: "Products",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ProductSlice.reducer;
