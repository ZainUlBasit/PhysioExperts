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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/doctors",
    element: <Doctors />,
  },
  {
    path: "/add-appointment",
    element: <AddAppointment />,
  },
  {
    path: "/doctors/:city",
    element: <DoctorList />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/plans",
    element: <Plans />,
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
