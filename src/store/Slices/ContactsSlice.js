import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetDoctorApi,
  GetDoctorsContactsAPI,
  GetPatientContactsAPI,
} from "../../Api_Requests/Api_Requests";

export const fetchContacts = createAsyncThunk(
  "fetch-contacts",
  async (userData) => {
    console.log(userData);
    try {
      console.log(userData);
      let response;
      if (userData.role === 2) {
        response = await GetDoctorsContactsAPI(userData.doctorId._id);
        console.log(response.data);
        return response?.data;
      } else if (userData.role === 3) {
        response = await GetPatientContactsAPI(userData.patientId._id);
        return response?.data?.data?.payload || [];
      }
      return [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const ContactsSlice = createSlice({
  name: "contacts",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ContactsSlice.reducer;
