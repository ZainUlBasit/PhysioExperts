import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../store/Slices/DoctorSlice";
import TableComp, {
  TableWrapper,
} from "../../components/Tables/TableComponent";
import { DoctorsAdminColumns } from "../../assets/Columns/DoctorsAdminColumns";
import PageLoader from "../../components/Loaders/PageLoader";
import NotFoundImage from "../../assets/images/not_found.jpg";
import TableHeader from "../../components/Header/TableHeader";
import EditDoctorModal from "../../components/Modals/EditDoctorModal";
import DeleteModal from "../../components/Modals/DeleteModal";

const AdminDoctors = () => {
  const [SearchText, setSearchText] = useState("");
  const [SelectedId, setSelectedId] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const onSubmit = async (e) => {};
  const dispatch = useDispatch();
  const DoctorState = useSelector((state) => state.DoctorState);
  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);
  return (
    <div>
      <AdminNavbar />
      {DoctorState.loading ? (
        <div className="flex flex-1 justify-center items-center my-10">
          <PageLoader />
        </div>
      ) : DoctorState.data && DoctorState.data.length === 0 ? (
        <div className="flex flex-1 justify-center items-center my-10">
          <img src={NotFoundImage} className="w-[200px]" alt="" />
        </div>
      ) : (
        <TableWrapper>
          <TableHeader
            title={"Doctors"}
            value={SearchText}
            setValue={setSearchText}
            placeholder={"Search doctor name"}
          />
          <TableComp
            setSelectedId={setSelectedId}
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            rows={DoctorState.data || [{}]}
            columns={DoctorsAdminColumns.filter((dt) => dt.id !== "view")}
          />
        </TableWrapper>
      )}
      {OpenEditModal && (
        <EditDoctorModal
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          currentDoctor={DoctorState.data.find((dt) => dt._id === SelectedId)}
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

export default AdminDoctors;
