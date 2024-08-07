import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetDoctorApi,
  GetDoctorsContactsAPI,
  GetPatientContactsAPI,
  GetStats,
} from "../../Api_Requests/Api_Requests";

export const fetchStats = createAsyncThunk("fetch-stats", async () => {
  try {
    let response;
    response = await GetStats();
    return response?.data?.data?.payload || [];
  } catch (error) {
    console.log(error);
  }
  return [];
});

const StatsSlice = createSlice({
  name: "stats",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchStats.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default StatsSlice.reducer;
