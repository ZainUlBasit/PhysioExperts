import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsOrders } from "../../store/Slices/ProductOrderSlice";
import PageLoader from "../../components/Loaders/PageLoader";
import TableComp, {
  TableWrapper,
} from "../../components/Tables/TableComponent";
import TableHeader from "../../components/Header/TableHeader";
import { ProductOrderColumns } from "../../assets/Columns/ProductOrderColumns";
import ShowOrderDetailsModal from "../../components/Modals/ShowOrderDetailsModal";

const AdminProductOrders = () => {
  const dispatch = useDispatch();
  const ProductOrderState = useSelector((state) => state.ProductOrderState);
  const [SearchText, setSearchText] = useState("");
  const [ViewDetail, setViewDetail] = useState("");
  const [SelectedId, setSelectedId] = useState("");

  useEffect(() => {
    dispatch(fetchProductsOrders());
  }, []);
  return (
    <div>
      <AdminNavbar />
      {ProductOrderState.loading ? (
        <div className="flex flex-1 justify-center items-center my-10">
          <PageLoader />
        </div>
      ) : (
        <TableWrapper>
          <TableHeader
            title={"Product Orders"}
            value={SearchText}
            setValue={setSearchText}
            placeholder={"Search Order Number"}
          />
          <TableComp
            setView={setViewDetail}
            setSelectedId={setSelectedId}
            rows={ProductOrderState.data || [{}]}
            columns={ProductOrderColumns}
          />
        </TableWrapper>
      )}
      {ViewDetail && (
        <ShowOrderDetailsModal
          open={ViewDetail}
          setOpen={setViewDetail}
          orderDetails={ProductOrderState.data.find(
            (dt) => dt._id === SelectedId
          )}
        />
      )}
    </div>
  );
};

export default AdminProductOrders;
