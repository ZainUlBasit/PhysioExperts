import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetDoctorRequestsApi } from "../../Api_Requests/Api_Requests";

export const fetchDoctorsRequests = createAsyncThunk(
  "fetch-doctor-requests",
  async () => {
    try {
      const response = await GetDoctorRequestsApi();
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const DoctorRequestSlice = createSlice({
  name: "doctors-requests",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctorsRequests.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDoctorsRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchDoctorsRequests.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default DoctorRequestSlice.reducer;
