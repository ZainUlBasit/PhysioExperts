import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    loading: true,
    auth: false,
    data: [],
    isError: false,
  },
  reducers: {
    SetAuth: (state, action) => {
      console.log(action.payload);
      state.auth = true;
      state.loading = false;
      state.data = action.payload;
    },
    SetAuthNotFound: (state, action) => {
      state.auth = false;
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { SetAuth, SetAuthNotFound } = AuthSlice.actions;
export default AuthSlice.reducer;
