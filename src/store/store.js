import { configureStore } from "@reduxjs/toolkit";
import DoctorSlice from "./Slices/DoctorSlice";
import DoctorRequestSlice from "./Slices/DoctorRequestSlice";
import PatientSlice from "./Slices/PatientSlice";
import ProductSlice from "./Slices/ProductSlice";
import BlogSlice from "./Slices/BlogSlice";
import ServiceSlice from "./Slices/ServiceSlice";
import ProductOrderSlice from "./Slices/ProductOrderSlice";
import AuthSlice from "./Slices/AuthSlice";
import ContactsSlice from "./Slices/ContactsSlice";
import AppointmentSlice from "./Slices/AppointmentSlice";
import CategorySlice from "./Slices/CategorySlice";
import VideoSlice from "./Slices/VideoSlice";
import ChatBotSlice from "./Slices/ChatBotSlice";

export const store = configureStore({
  reducer: {
    AuthState: AuthSlice,
    DoctorState: DoctorSlice,
    DoctorRequestState: DoctorRequestSlice,
    PatientState: PatientSlice,
    ProductState: ProductSlice,
    ProductOrderState: ProductOrderSlice,
    BlogState: BlogSlice,
    ServiceState: ServiceSlice,
    ContactsState: ContactsSlice,
    AppointmentState: AppointmentSlice,
    CategoryState: CategorySlice,
    VideoState: VideoSlice,
    ChatBotState: ChatBotSlice,
  },
});
