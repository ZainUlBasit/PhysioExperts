import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../store/Slices/PatientSlice";
import { AdminPatientColumns } from "../../assets/Columns/AdminPatientColumns";
import PageLoader from "../../components/Loaders/PageLoader";
import TableComp, {
  TableWrapper,
} from "../../components/Tables/TableComponent";
import TableHeader from "../../components/Header/TableHeader";
import EditPatientModal from "../../components/Modals/EditPatientModal";
import DeleteModal from "../../components/Modals/DeleteModal";

const AdminPatients = () => {
  const [SearchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const PatientState = useSelector((state) => state.PatientState);
  const [SelectedId, setSelectedId] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const onSubmit = async (e) => {};
  useEffect(() => {
    dispatch(fetchPatients());
  }, []);
  return (
    <div>
      <AdminNavbar />
      {PatientState.loading ? (
        <div className="flex flex-1 justify-center items-center my-10">
          <PageLoader />
        </div>
      ) : (
        <TableWrapper>
          <TableHeader
            title={"Patients"}
            value={SearchText}
            setValue={setSearchText}
            placeholder={"Search Patient name"}
          />
          <TableComp
            setSelectedId={setSelectedId}
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            rows={PatientState.data || [{}]}
            columns={AdminPatientColumns}
          />
        </TableWrapper>
      )}
      {OpenEditModal && (
        <EditPatientModal
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          currentPatient={PatientState.data.find((dt) => dt._id === SelectedId)}
        />
      )}
      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={onSubmit}
          Loading={Loading}
        />
      )}
    </div>
  );
};

export default AdminPatients;
