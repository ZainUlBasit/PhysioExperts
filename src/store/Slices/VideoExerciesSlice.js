import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetDoctorApi,
  GetExercieseApi,
  GetVideosApi,
} from "../../Api_Requests/Api_Requests";

export const fetchExercises = createAsyncThunk(
  "fetch-videos-exercises",
  async () => {
    try {
      let response;
      response = await GetVideosApi();
      console.log(response.data);
      return response.data.data.payload || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

const VideoSlice = createSlice({
  name: "videos-exercises",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExercises.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default VideoSlice.reducer;
