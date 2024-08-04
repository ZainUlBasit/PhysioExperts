import { createSlice } from "@reduxjs/toolkit";

const ExerciseSlice = createSlice({
  name: "ExerciseSlice",
  initialState: {
    exercises: [],
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
  },
});

export const { addExercise, deleteExercise, initailizeExercise } =
  ExerciseSlice.actions;

export default ExerciseSlice.reducer;
