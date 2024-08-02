import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllServiceApi } from "../../Api_Requests/Api_Requests";

export const fetchServices = createAsyncThunk("fetch-Services", async () => {
  try {
    const response = await GetAllServiceApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const ServiceSlice = createSlice({
  name: "Services",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchServices.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ServiceSlice.reducer;
