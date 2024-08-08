import axios from "axios";
import { BASE_URL, BASE_URL_LOCAL } from "../utils/Config";

export const userToken = localStorage.getItem("userToken");
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    token: userToken,
  },
});

export const apiForImage = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    token: userToken,
  },
});

// Auth Requests
export const LoginUserApi = (payload) => api.post("/auth/login", payload);
export const RegisterUserApi = (payload) => api.post("/auth/register", payload);
export const UpdateStatusApi = (payload) =>
  api.patch("/appointment/status", payload);

export const VerifyAdminOtpApi = (payload) =>
  api.post("/auth/verify-otp", payload);

// Stats Requests
export const GetStats = () => api.get("/stats/get");

//   Contacts Requests
export const GetPatientContactsAPI = (id) => api.get("/contacts/patient/" + id);
export const GetDoctorsContactsAPI = (id) => api.get("/contacts/doctor/" + id);

// Doctor List
export const GetDoctorApi = () => api.get("/doctor");
export const GetDoctorRequestsApi = () => api.get("/doctor/requests");
export const ApproveDoctorRequestsApi = (id) =>
  api.patch("/doctor/approved/" + id);
export const RejectDoctorRequestsApi = (id) =>
  api.delete("/doctor/rejected/" + id);
export const UpdateDoctorApi = (id, payload) =>
  api.patch("/doctor/" + id, payload);

// Chat List
export const SendMessageAPI = (payload) =>
  api.post("/chat/send-message", payload);

// Appointment Requests
export const GetAppointmentByIdAPI = (payload) =>
  api.post("/appointment/get", payload);
export const UpdatePrescriptionAPI = (payload) =>
  api.patch("/appointment/update_prescription", payload);

// Patient Api
export const GetPatientApi = () => api.get("/patient");
export const AddAppoitmentPatientApi = (payload) =>
  api.post("/patient/add-appointment", payload);
export const GetPatientExercisesApi = (id) =>
  api.get("/patient/get-exercises/" + id);

export const GetAvailableSlotApi = (payload) =>
  api.post("/appointment/available_slots", payload);

export const UpdatePatientAPI = (id, payload) =>
  api.patch("/patient/" + id, payload);

// products API
export const AddNewProductApi = (payload) =>
  api.post("/products/create", payload);
export const GetAllProductApi = () => api.get("/products/all");
export const UpdateProductApi = (id, payload) =>
  api.patch("/products/" + id, payload);
export const DeleteProductApi = (id) => api.delete("/products/" + id);

// products orders API
export const CreateProductOrderApi = (payload) =>
  api.post("/products-order/create", payload);
export const GetAllProductOrderApi = () => api.get("/products-order/all");
export const UpdateProductOrderApi = (id, payload) =>
  api.patch("/products-order/" + id, payload);
// blogs API
export const AddNewBlogApi = (payload) => api.post("/blogs/create", payload);
export const GetAllBlogApi = () => api.get("/blogs/all");
export const DeleteBlogApi = (id) => api.delete("/blogs/" + id);
export const UpdateBlogApi = (id, payload) =>
  api.patch("/blogs/" + id, payload);

// services API
export const AddNewServiceApi = (payload) =>
  api.post("/services/create", payload);
export const GetAllServiceApi = () => api.get("/services/all");
export const DeleteServiceApi = (id) => api.delete("/services/" + id);
export const UpdateServiceApi = (id, payload) =>
  api.patch("/services/" + id, payload);

// Appoitment
export const AddNewAppoitmentApi = (payload) =>
  api.post("/products-order/place-order", payload);
// Categoryt
export const AddNewCategoryApi = (payload) =>
  api.post("/category/create", payload);
export const GetAllCategoriesApi = () => api.get("/category/all");
export const UpdateCategoryApi = (id, payload) =>
  api.patch("/category/" + id, payload);
export const DeleteCategoryApi = (id) => api.delete("/category/" + id);

// exercises
export const CreateExercieseApi = (payload) =>
  api.post("/exercise/create", payload);
export const GetExercieseApi = () => api.get("/exercise/allexercises");
export const GetVideosApi = () => api.get("/exercise/allvideos");
export const GetExerciseByIdApi = (id) => api.get("/exercise/" + id);
export const DeleteExerciseApi = (id) => api.delete("/exercise/" + id);
export const UpdateExerciseApi = (id, payload) =>
  api.patch("/category/" + id, payload);
