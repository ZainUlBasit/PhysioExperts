import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAllCategoriesApi,
  GetAllProductApi,
} from "../../Api_Requests/Api_Requests";

export const fetchCategories = createAsyncThunk(
  "fetch-Categories",
  async () => {
    try {
      const response = await GetAllCategoriesApi();
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const CategorySlice = createSlice({
  name: "Categories",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CategorySlice.reducer;
