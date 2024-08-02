import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetDoctorApi,
  GetExercieseApi,
  GetVideosApi,
} from "../../Api_Requests/Api_Requests";

export const fetchVideos = createAsyncThunk("fetch-videos", async (type) => {
  try {
    let response;
    if (type === 1) {
      response = await GetVideosApi();
    } else if (type === 2) {
      response = await GetExercieseApi();
    }
    console.log(response.data);
    return response.data.data.payload || [];
  } catch (error) {
    console.log(error);
    return [];
  }
});

const VideoSlice = createSlice({
  name: "videos",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default VideoSlice.reducer;
