import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetPatientApi } from "../../Api_Requests/Api_Requests";

export const fetchPatients = createAsyncThunk("patients/fetch", async () => {
  try {
    const response = await GetPatientApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
    throw error; // Throw error to trigger the rejected case
  }
});

export const fetchPatientsForChat = createAsyncThunk(
  "patients/fetchForChat",
  async () => {
    try {
      const response = await GetPatientApi();
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
      throw error; // Throw error to trigger the rejected case
    }
  }
);

const PatientSlice = createSlice({
  name: "patients",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchPatients.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
    builder.addCase(fetchPatientsForChat.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchPatientsForChat.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchPatientsForChat.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default PatientSlice.reducer;
