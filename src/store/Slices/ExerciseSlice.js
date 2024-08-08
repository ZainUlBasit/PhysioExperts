import { createSlice } from "@reduxjs/toolkit";

const ExerciseSlice = createSlice({
  name: "ExerciseSlice",
  initialState: {
    exercises: [],
    videos: [],
  },
  reducers: {
    initailizeExercise: (state, action) => {
      state.exercises = action.payload[0] !== "" ? action.payload : [];
    },
    addExercise: (state, action) => {
      if (!state.exercises) {
        state.exercises = [action.payload];
      } else if (
        !state.exercises.some((exercise) => exercise === action.payload)
      ) {
        state.exercises = [...state.exercises, action.payload];
      }
    },

    deleteExercise: (state, action) => {
      if (state.exercises) {
        state.exercises = state.exercises.filter((dt) => dt !== action.payload);
      } else {
        state.exercises = null;
      }
    },
    initailizeVideos: (state, action) => {
      state.videos = action.payload[0] !== "" ? action.payload : [];
    },
    addVideos: (state, action) => {
      if (!state.exercises) {
        state.videos = [action.payload];
      } else if (!state.videos.some((video) => video === action.payload)) {
        state.videos = [...state.videos, action.payload];
      }
    },

    deleteVideo: (state, action) => {
      if (state.videos) {
        state.videos = state.videos.filter((dt) => dt !== action.payload);
      } else {
        state.videos = null;
      }
    },
  },
});

export const {
  addExercise,
  deleteExercise,
  initailizeExercise,
  initailizeVideos,
  addVideos,
  deleteVideo,
} = ExerciseSlice.actions;

export default ExerciseSlice.reducer;
