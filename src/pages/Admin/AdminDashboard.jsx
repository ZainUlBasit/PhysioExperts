import React from "react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import AdminDashboardTable from "../../components/Tables/AdminDashboardTable";
import { DashboardAdminColumns } from "../../assets/Columns/DashboardAdminColumns";
import { TableWrapper } from "../../components/Tables/TableComponent";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <TableWrapper>
        <AdminDashboardTable
          columns={DashboardAdminColumns}
          rows={[{ no_of_doctors: 100 }]}
        />
      </TableWrapper>
    </div>
  );
};

export default AdminDashboard;
