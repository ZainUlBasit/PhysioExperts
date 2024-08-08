import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetPatientApi,
  GetPatientExercisesApi,
} from "../../Api_Requests/Api_Requests";

export const fetchPatientExercises = createAsyncThunk(
  "patients-exercises/fetch",
  async (id) => {
    try {
      const response = await GetPatientExercisesApi(id);
      console.log(response.data);
      return response.data.data.payload;
    } catch (error) {
      console.log(error);
      throw error; // Throw error to trigger the rejected case
    }
  }
);

const PatientExercisesSlice = createSlice({
  name: "patients-exercises",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatientExercises.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPatientExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchPatientExercises.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default PatientExercisesSlice.reducer;
