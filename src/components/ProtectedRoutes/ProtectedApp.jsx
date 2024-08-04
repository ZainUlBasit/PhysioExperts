import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { SetAuth, SetAuthNotFound } from "../../store/Slices/AuthSlice";
import PageLoader from "../Loaders/PageLoader";
import App from "../../App";
import Services from "../../pages/Services/Services";
import DoctorList from "../../pages/Doctors/DoctorList";
import Doctors from "../../pages/Doctors/Doctors";
import AddAppointment from "../../pages/Add Appointment/AddAppointment";
import Products from "../../pages/Products/Products";
import Cart from "../../pages/Cart/Cart";
import Blogs from "../../pages/Blogs/Blogs";
import Plans from "../../pages/Plans/Plans";
import AdminLogin from "../../pages/Admin/AdminLogin";
import DoctorLogin from "../../pages/Doctor/DoctorLogin";
import DoctorRegistration from "../../pages/Doctor/DoctorRegistration";
import PatientLogin from "../../pages/Patient/PatientLogin";
import PatientRegistration from "../../pages/Patient/PatientRegistration";
import AdminDashboard from "../../pages/Admin/AdminDashboard";
import AdminDoctors from "../../pages/Admin/AdminDoctors";
import AdminPatients from "../../pages/Admin/AdminPatients";
import AdminVisitors from "../../pages/Admin/AdminVisitors";
import AdminProductOrders from "../../pages/Admin/AdminProductOrders";
import AdminProducts from "../../pages/Admin/AdminUploads";
import AdminRequests from "../../pages/Admin/AdminRequests";
import DoctorDashboard from "../../pages/Doctor/DoctorDashboard";
import DoctorNewPatients from "../../pages/Doctor/DoctorNewPatients";
import DoctorOldPatients from "../../pages/Doctor/DoctorOldPatients";
import DoctorAppointment from "../../pages/Doctor/DoctorAppointment";
import DoctorProfile from "../../pages/Doctor/DoctorProfile";
import PatientDashboard from "../../pages/Patient/PatientDashboard";
import PatientVideos from "../../pages/Patient/PatientVideos";
import PatientExercises from "../../pages/Patient/PatientExercises";
import PatientNewAppoinment from "../../pages/Patient/PatientNewAppoinment";
import PatientHistory from "../../pages/Patient/PatientHistory";
import PatientChat from "../../pages/Patient/PatientChat";
import { Toaster } from "react-hot-toast";
import io from "socket.io-client";
import { BASE_URL, SOCKET_BASE_URL } from "../../utils/Config";
import { SuccessToast } from "../../utils/ShowToast";
import DoctorChat from "../../pages/Doctor/DoctorChat";
import AdminLayout from "../Layouts/AdminLayout";
import VisitorLayout from "../Layouts/VisitorLayout";
import PrescriptionForm from "../Forms/PrescriptionForm";

function ProtectedApp() {
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.AuthState);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userToken) return;

    const socket = io(SOCKET_BASE_URL, {
      extraHeaders: {
        token: userToken,
        secretkey: "wWXYF6QeeF",
      },
    });

    socket.on("notification-message", (data) => {
      localStorage.setItem("notify", true);
      SuccessToast(data.description);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, [userToken]);

  useEffect(() => {
    setTimeout(() => {
      const isLoggedIn = localStorage.getItem("logged-in");
      if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem("user-data"));
        dispatch(SetAuth(user));
      } else {
        dispatch(SetAuthNotFound([]));
      }
    }, 4000); // execute the function after 4 seconds
  }, [dispatch]);

  const VisitorRouter = createBrowserRouter([
    {
      path: "/",
      element: <VisitorLayout />,
      children: [
        { path: "/", element: <App /> },
        { path: "/services", element: <Services /> },
        { path: "/doctors", element: <DoctorList /> },
        { path: "/appointment/select-city", element: <Doctors /> },
        { path: "/add-appointment/:id", element: <AddAppointment /> },
        { path: "/doctors/:city", element: <DoctorList /> },
        { path: "/products", element: <Products /> },
        { path: "/products/cart/:id", element: <Cart /> },
        { path: "/blogs", element: <Blogs /> },
        { path: "/plans", element: <Plans /> },
        { path: "/admin", element: <AdminLogin /> },
        { path: "/doctor", element: <DoctorLogin /> },
        { path: "/doctor/registration", element: <DoctorRegistration /> },
        { path: "/patient", element: <PatientLogin /> },
        { path: "/patient/registration", element: <PatientRegistration /> },
        { path: "/*", element: <Navigate to="/" /> },
      ],
    },
  ]);

  const AdminRouter = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        { path: "/admin/dashboard", element: <AdminDashboard /> },
        { path: "/admin/doctors", element: <AdminDoctors /> },
        { path: "/admin/patients", element: <AdminPatients /> },
        { path: "/admin/visitors", element: <AdminVisitors /> },
        { path: "/admin/product-order", element: <AdminProductOrders /> },
        { path: "/admin/uploads", element: <AdminProducts /> },
        { path: "/admin/requests", element: <AdminRequests /> },
        { path: "/*", element: <Navigate to="/admin/dashboard" /> },
      ],
    },
  ]);

  const DoctorRouter = createBrowserRouter([
    { path: "/doctor/dashboard", element: <DoctorDashboard /> },
    { path: "/doctor/new-patients", element: <DoctorNewPatients /> },
    { path: "/doctor/old-patients", element: <DoctorOldPatients /> },
    { path: "/doctor/appointment", element: <DoctorAppointment /> },
    {
      path: "/appointment/prescription/:id", //id: Doctor Id
      element: <PrescriptionForm />,
    },
    { path: "/doctor/profile", element: <DoctorProfile /> },
    { path: "/doctor/chat", element: <DoctorChat /> },
    { path: "/*", element: <Navigate to="/doctor/dashboard" /> },
  ]);

  const PatientRouter = createBrowserRouter([
    { path: "/patient/dashboard", element: <PatientDashboard /> },
    { path: "/patient/videos", element: <PatientVideos /> },
    { path: "/patient/exercises", element: <PatientExercises /> },
    { path: "/patient/new-appointment", element: <PatientNewAppoinment /> },
    { path: "/patient/history", element: <PatientHistory /> },
    { path: "/patient/chat", element: <PatientChat /> },
    { path: "/*", element: <Navigate to="/patient/dashboard" /> },
  ]);

  return AuthState.loading ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <PageLoader />
    </div>
  ) : (
    <>
      <RouterProvider
        router={
          AuthState.data.role === 1
            ? AdminRouter
            : AuthState.data.role === 2
            ? DoctorRouter
            : AuthState.data.role === 3
            ? PatientRouter
            : VisitorRouter
        }
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default ProtectedApp;
