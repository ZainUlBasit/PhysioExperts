import React, { useEffect, useState } from "react";
import DoctorNavbar from "../../components/Navbar/DoctorNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment } from "../../store/Slices/AppointmentSlice";
import { AppointmentColumns } from "../../assets/Columns/AppointmentColumns";
import TableComp, {
  TableWrapper,
} from "../../components/Tables/TableComponent";
import TableHeader from "../../components/Header/TableHeader";
import PageLoader from "../../components/Loaders/PageLoader";
import { useNavigate } from "react-router-dom";

const DoctorAppointment = () => {
  const dispatch = useDispatch();
  const AppointmentState = useSelector((state) => state.AppointmentState);
  const AuthState = useSelector((state) => state.AuthState);

  const [SelectedId, setSelectedId] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [OpenView, setOpenView] = useState(false);
  const [SearchText, setSearchText] = useState("");
  useEffect(() => {
    const payload =
      AuthState.data.role === 2
        ? {
            type: "doctor",
            id: AuthState.data.doctorId._id,
          }
        : {
            type: "patient",
            id: AuthState.data.patientId._id,
          };
    dispatch(fetchAppointment(payload));
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (OpenView) {
      navigate("/appointment/prescription/" + SelectedId);
    }
  }, [OpenView]);
  return (
    <div>
      <DoctorNavbar />
      {AppointmentState.loading ? (
        <div className="flex flex-1 justify-center items-center my-10">
          <PageLoader />
        </div>
      ) : (
        <TableWrapper>
          <TableHeader
            title={"Appointments"}
            value={SearchText}
            setValue={setSearchText}
            placeholder={"Search Patient name"}
          />
          <TableComp
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            rows={AppointmentState.data || [{}]}
            columns={AppointmentColumns}
            setSelectedId={setSelectedId}
            setView={setOpenView}
          />
        </TableWrapper>
      )}
    </div>
  );
};

export default DoctorAppointment;
