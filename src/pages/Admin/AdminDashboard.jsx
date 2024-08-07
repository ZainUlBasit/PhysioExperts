import React, { useEffect } from "react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminDashboardTable from "../../components/Tables/AdminDashboardTable";
import { DashboardAdminColumns } from "../../assets/Columns/DashboardAdminColumns";
import { TableWrapper } from "../../components/Tables/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../store/Slices/StatsSlice";
import PageLoader from "../../components/Loaders/PageLoader";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const StatsState = useSelector((state) => state.StatsState);

  useEffect(() => {
    dispatch(fetchStats());
  }, []);
  return (
    <div>
      <AdminNavbar />
      {StatsState.loading ? (
        <div className="w-full flex justify-center items-center py-8">
          <PageLoader />
        </div>
      ) : StatsState.data ? (
        <TableWrapper>
          <AdminDashboardTable
            columns={DashboardAdminColumns}
            rows={StatsState.data}
          />
        </TableWrapper>
      ) : (
        StatsState.data.length === 0 && <div>No Data Found!</div>
      )}
    </div>
  );
};

export default AdminDashboard;
