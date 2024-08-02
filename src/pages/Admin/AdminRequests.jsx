import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsRequests } from "../../store/Slices/DoctorRequestSlice";
import TableComp, {
  TableWrapper,
} from "../../components/Tables/TableComponent";
import { DoctorsAdminColumns } from "../../assets/Columns/DoctorsAdminColumns";
import { FaSearch } from "react-icons/fa";
import TableHeader from "../../components/Header/TableHeader";
import PageLoader from "../../components/Loaders/PageLoader";
import DoctorDetailModal from "../../components/Modals/DoctorDetailModal";

const AdminRequests = () => {
  const [SearchText, setSearchText] = useState("");
  const [ViewDetail, setViewDetail] = useState(false);
  const [SelectedId, setSelectedId] = useState("");
  const dispatch = useDispatch();
  const DoctorRequestState = useSelector((state) => state.DoctorRequestState);
  useEffect(() => {
    dispatch(fetchDoctorsRequests());
  }, []);
  return (
    <div className="min-h-screen">
      <AdminNavbar />
      {DoctorRequestState.loading ? (
        <div className="flex flex-1 justify-center items-center my-10">
          <PageLoader />
        </div>
      ) : (
        <TableWrapper>
          <TableHeader
            title={"Doctors Requests"}
            value={SearchText}
            setValue={setSearchText}
            placeholder={"Search doctor name"}
          />
          <TableComp
            setView={setViewDetail}
            setSelectedId={setSelectedId}
            rows={DoctorRequestState.data || [{}]}
            columns={DoctorsAdminColumns.filter(
              (dt) =>
                dt.id !== "clinic_time" &&
                dt.id !== "on_days" &&
                dt.id !== "imageUrl" &&
                dt.id !== "actions"
            )}
          />
        </TableWrapper>
      )}
      {ViewDetail && (
        <DoctorDetailModal
          Open={ViewDetail}
          setOpen={setViewDetail}
          currentDoctor={DoctorRequestState.data.find(
            (dt) => dt._id === SelectedId
          )}
        />
      )}
    </div>
  );
};

export default AdminRequests;
