import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAppointmentByIdAPI,
  GetDoctorApi,
} from "../../Api_Requests/Api_Requests";

export const fetchAppointment = createAsyncThunk(
  "fetch-appointment",
  async (payload) => {
    try {
      const response = await GetAppointmentByIdAPI(payload);
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const AppointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppointment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchAppointment.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default AppointmentSlice.reducer;
