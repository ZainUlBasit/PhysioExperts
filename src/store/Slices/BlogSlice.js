import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllBlogApi } from "../../Api_Requests/Api_Requests";

export const fetchBlogs = createAsyncThunk("fetch-Blogs", async () => {
  try {
    const response = await GetAllBlogApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const BlogSlice = createSlice({
  name: "Blogs",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default BlogSlice.reducer;
