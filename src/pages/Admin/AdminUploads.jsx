import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/Slices/ProductSlice";
import {
  AdminBlogColumns,
  AdminCategoryColumns,
  AdminProductColumns,
  AdminServiceColumns,
} from "../../assets/Columns/ProductColumns";
import TableComp, {
  TableWrapper,
} from "../../components/Tables/TableComponent";
import TableHeader from "../../components/Header/TableHeader";
import PageLoader from "../../components/Loaders/PageLoader";
import { fetchBlogs } from "../../store/Slices/BlogSlice";
import { fetchServices } from "../../store/Slices/ServiceSlice";
import SimpleBtn from "../../components/Button/SimpleBtn";
import AddNewProductModal from "../../components/Modals/AddNewProductModal";
import EditProductModal from "../../components/Modals/EditProductModal";
import AddNewBlogModal from "../../components/Modals/AddNewBlogModal";
import EditBlogModal from "../../components/Modals/EditBlogModal";
import AddNewServiceModal from "../../components/Modals/AddNewServiceModal";
import EditServiceModal from "../../components/Modals/EditServiceModal";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import AddNewCategoryModal from "../../components/Modals/AddNewCategoryModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditCategoryModal from "../../components/Modals/EditCategoryModal";
import { DeleteCategoryApi } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import Videos from "./Videos";
import Exercises from "./Exercises";

const AdminProducts = () => {
  const [SearchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const ProductState = useSelector((state) => state.ProductState);
  const BlogState = useSelector((state) => state.BlogState);
  const ServiceState = useSelector((state) => state.ServiceState);
  const CategoryState = useSelector((state) => state.CategoryState);

  // product states
  const [OpenNewProductModal, setOpenNewProductModal] = useState(false);
  const [OpenNewBlogModal, setOpenNewBlogModal] = useState(false);
  const [OpenNewServiceModal, setOpenNewServiceModal] = useState(false);
  const [OpenNewCategoryModal, setOpenNewCategoryModal] = useState(false);

  const [SelectedId, setSelectedId] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [CurrentTab, setCurrentTab] = useState("products");
  const [Loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    setLoading(true);
    if (CurrentTab === "products") {
    } else if (CurrentTab === "blogs") {
    } else if (CurrentTab === "services") {
    } else if (CurrentTab === "category") {
      try {
        const response = await DeleteCategoryApi(SelectedId);
        if (response.data.success) {
          SuccessToast("Category Deleted successfully!");
          dispatch(fetchCategories());
          setOpenDeleteModal(false);
        } else {
          ErrorToast("Unable to delete category");
        }
      } catch (err) {
        console.log(err);
        ErrorToast(err.response?.data?.error?.msg || err.message);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    if (CurrentTab === "products") {
      dispatch(fetchProducts());
    } else if (CurrentTab === "blogs") {
      dispatch(fetchBlogs());
    } else if (CurrentTab === "services") {
      dispatch(fetchServices());
    } else if (CurrentTab === "category") {
      dispatch(fetchCategories());
    }
  }, [CurrentTab]);
  return (
    <div>
      <AdminNavbar />
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[90%] flex justify-center items-center bg-[#EFE7EC] rounded-[40px] font-[700] text-[1.5rem] mt-5 mb-8">
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "products"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("products")}
          >
            Products
          </div>
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "blogs"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("blogs")}
          >
            Blogs
          </div>
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "services"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("services")}
          >
            Services
          </div>
        </div>
        <div className="w-[90%] flex justify-center items-center bg-[#EFE7EC] rounded-[40px] font-[700] text-[1.5rem] mt-5 mb-8">
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "videos"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("videos")}
          >
            Videos
          </div>
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "category"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("category")}
          >
            Category
          </div>
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "exercise"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("exercise")}
          >
            Excercise
          </div>
        </div>
      </div>
      {CurrentTab === "products" &&
        (ProductState.loading ? (
          <div className="flex flex-1 justify-center items-center my-10">
            <PageLoader />
          </div>
        ) : (
          <TableWrapper>
            <div className="w-full flex justify-end py-4">
              <SimpleBtn
                title={"Add New Product"}
                onClick={() => {
                  setOpenNewProductModal(true);
                }}
              />
            </div>
            <TableHeader
              title={"Products"}
              value={SearchText}
              setValue={setSearchText}
              placeholder={"Search Product"}
            />
            <TableComp
              setSelectedId={setSelectedId}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              rows={ProductState.data || [{}]}
              columns={AdminProductColumns}
            />
          </TableWrapper>
        ))}
      {CurrentTab === "blogs" &&
        (BlogState.loading ? (
          <div className="flex flex-1 justify-center items-center my-10">
            <PageLoader />
          </div>
        ) : (
          <TableWrapper>
            <div className="w-full flex justify-end py-4">
              <SimpleBtn
                title={"Add New Blog"}
                onClick={() => {
                  setOpenNewBlogModal(true);
                }}
              />
            </div>
            <TableHeader
              title={"Blogs"}
              value={SearchText}
              setValue={setSearchText}
              placeholder={"Search Blog"}
            />
            <TableComp
              setSelectedId={setSelectedId}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              rows={BlogState.data || [{}]}
              columns={AdminBlogColumns}
            />
          </TableWrapper>
        ))}
      {CurrentTab === "services" &&
        (ServiceState.loading ? (
          <div className="flex flex-1 justify-center items-center my-10">
            <PageLoader />
          </div>
        ) : (
          <TableWrapper>
            <div className="w-full flex justify-end py-4">
              <SimpleBtn
                title={"Add New Service"}
                onClick={() => {
                  setOpenNewServiceModal(true);
                }}
              />
            </div>
            <TableHeader
              title={"Services"}
              value={SearchText}
              setValue={setSearchText}
              placeholder={"Search Service"}
            />
            <TableComp
              setSelectedId={setSelectedId}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              rows={ServiceState.data || [{}]}
              columns={AdminServiceColumns}
            />
          </TableWrapper>
        ))}
      {CurrentTab === "videos" && <Videos />}
      {CurrentTab === "exercise" && <Exercises />}

      {/* Category Tab */}
      {CurrentTab === "category" &&
        (ServiceState.loading ? (
          <div className="flex flex-1 justify-center items-center my-10">
            <PageLoader />
          </div>
        ) : (
          <TableWrapper>
            <div className="w-full flex justify-end py-4">
              <SimpleBtn
                title={"Add New Category"}
                onClick={() => {
                  setOpenNewCategoryModal(true);
                }}
              />
            </div>
            <TableHeader
              title={"Categories"}
              value={SearchText}
              setValue={setSearchText}
              placeholder={"Search Category"}
            />
            <TableComp
              setSelectedId={setSelectedId}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              rows={CategoryState.data || [{}]}
              columns={AdminCategoryColumns}
            />
          </TableWrapper>
        ))}

      {OpenNewProductModal && (
        <AddNewProductModal
          Open={OpenNewProductModal}
          setOpen={setOpenNewProductModal}
        />
      )}
      {OpenNewBlogModal && (
        <AddNewBlogModal
          Open={OpenNewBlogModal}
          setOpen={setOpenNewBlogModal}
        />
      )}
      {OpenNewServiceModal && (
        <AddNewServiceModal
          Open={OpenNewServiceModal}
          setOpen={setOpenNewServiceModal}
        />
      )}
      {OpenNewCategoryModal && (
        <AddNewCategoryModal
          Open={OpenNewCategoryModal}
          setOpen={setOpenNewCategoryModal}
        />
      )}
      {OpenEditModal && CurrentTab === "products" && (
        <EditProductModal
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          product={ProductState.data.find((dt) => dt._id === SelectedId)}
        />
      )}
      {OpenEditModal && CurrentTab === "blogs" && (
        <EditBlogModal
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          blog={BlogState.data.find((dt) => dt._id === SelectedId)}
        />
      )}
      {OpenEditModal && CurrentTab === "services" && (
        <EditServiceModal
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          service={ServiceState.data.find((dt) => dt._id === SelectedId)}
        />
      )}
      {OpenEditModal && CurrentTab === "category" && (
        <EditCategoryModal
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          category={CategoryState.data.find((dt) => dt._id === SelectedId)}
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

export default AdminProducts;
