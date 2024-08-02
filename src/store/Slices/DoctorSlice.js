import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetDoctorApi } from "../../Api_Requests/Api_Requests";

export const fetchDoctors = createAsyncThunk("fetch-doctor", async () => {
  try {
    const response = await GetDoctorApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const DoctorSlice = createSlice({
  name: "doctors",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchDoctors.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default DoctorSlice.reducer;
