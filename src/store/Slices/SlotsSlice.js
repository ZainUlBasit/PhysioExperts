import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetAvailableSlotApi,
  GetDoctorApi,
  GetDoctorsContactsAPI,
  GetPatientContactsAPI,
} from "../../Api_Requests/Api_Requests";

export const fetchSlots = createAsyncThunk("fetch-slots", async (payload) => {
  try {
    let response;
    response = await GetAvailableSlotApi(payload);
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const SlotsSlice = createSlice({
  name: "slots",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSlots.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSlots.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchSlots.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default SlotsSlice.reducer;
