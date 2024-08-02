import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import Services from "./pages/Services/Services";
import Doctors from "./pages/Doctors/Doctors";
import Products from "./pages/Products/Products";
import Blogs from "./pages/Blogs/Blogs";
import Plans from "./pages/Plans/Plans";
import DoctorList from "./pages/Doctors/DoctorList";
import AddAppointment from "./pages/Add Appointment/AddAppointment";
import AdminLogin from "./pages/Admin/AdminLogin";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import PatientLogin from "./pages/Patient/PatientLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminDoctors from "./pages/Admin/AdminDoctors";
import AdminPatients from "./pages/Admin/AdminPatients";
import AdminVisitors from "./pages/Admin/AdminVisitors";
import AdminProductOrders from "./pages/Admin/AdminProductOrders";
import AdminRequests from "./pages/Admin/AdminRequests";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorNewPatients from "./pages/Doctor/DoctorNewPatients";
import DoctorOldPatients from "./pages/Doctor/DoctorOldPatients";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import PatientVideos from "./pages/Patient/PatientVideos";
import PatientExercises from "./pages/Patient/PatientExercises";
import PatientNewAppoinment from "./pages/Patient/PatientNewAppoinment";
import PatientHistory from "./pages/Patient/PatientHistory";
import PatientChat from "./pages/Patient/PatientChat";
import { Toaster } from "react-hot-toast";
import DoctorRegistration from "./pages/Doctor/DoctorRegistration";
import PatientRegistration from "./pages/Patient/PatientRegistration";
import AdminProducts from "./pages/Admin/AdminUploads";
import Cart from "./pages/Cart/Cart";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import ProtectedApp from "./components/ProtectedRoutes/ProtectedApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProtectedApp />
    </Provider>
  </React.StrictMode>
);
