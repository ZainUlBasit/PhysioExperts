import React, { useState } from "react";
import CustomModal from "./CustomModal";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, Select } from "@mui/material";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { UpdateProductOrderApi } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { fetchProductsOrders } from "../../store/Slices/ProductOrderSlice";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { useDispatch } from "react-redux";

const ShowOrderDetailsModal = ({
  open,
  setOpen,
  orderDetails,
  handleStatusChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(orderDetails.status);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
    handleStatusChange(orderDetails._id, event.target.value);
    handleClose();
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <CustomModal open={open} setOpen={setOpen}>
      <div className="flex flex-col px-8 bg-aliceblue">
        <div className="py-8 text-4xl text-custom-bg border-b-custom-bg w-full text-center font-montserrat font-bold">
          Order Details
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="text-custom-bg text-2xl font-bold font-montserrat mb-0">
              Customer Detail
            </div>
            <div className="flex flex-col py-4">
              <div className="flex items-center">
                <span className="font-bold">Name:</span>
                <span className="ml-2">{orderDetails.name}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="font-bold">Email:</span>
                <span className="ml-2">{orderDetails.email}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="font-bold">Address:</span>
                <span className="ml-2">{orderDetails.address}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="font-bold">Mobile No:</span>
                <span className="ml-2">{orderDetails.mobile_no}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="font-bold">Order Status:</span>
                <span className="ml-2 flex items-center gap-x-2">
                  {status === 1
                    ? "Placed"
                    : status === 2
                    ? "Confirmed"
                    : status === 3
                    ? "Delivered"
                    : status === 4
                    ? "Cancel"
                    : "Unknown"}
                  <IoIosArrowDropdownCircle
                    className="text-xl text-custom-bg hover:text-custom-bg-hover cursor-pointer ease-in-out duration-500"
                    onClick={handleClick}
                  />
                </span>
              </div>
            </div>
            <div className="text-custom-bg text-2xl font-bold font-montserrat my-2 mb-4">
              Item Detail
            </div>
            {orderDetails.products.map((item) => (
              <div
                key={item._id}
                className="flex bg-white items-center justify-between mb-4 border-[1px] rounded-lg border-custom-bg-hover px-3 py-2 gap-x-7"
              >
                <div className="flex items-center gap-x-2">
                  <img
                    src={item.productId.imageUrl}
                    alt="Product Image"
                    className="w-24 h-24 rounded-[20px] relative"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold font-montserrat">
                      {item.name}
                    </span>
                    <span className="text-gray-600 font-montserrat">
                      PKR {item.price}/-
                    </span>
                  </div>
                </div>
                <div className="font-montserrat font-semibold flex-col">
                  {item.qty}
                </div>
                <div className="font-montserrat font-semibold">
                  PKR {item.price * item.qty}/-
                </div>
              </div>
            ))}
            <div className="flex justify-between text-xl font-bold mt-4">
              <span></span>
              <div className="font-montserrat font-semibold">
                Total Amount: PKR {orderDetails.total_amount}/-
              </div>
            </div>
            <div className="flex justify-center items-center my-4 gap-x-2">
              <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: "25px", // Add rounded corners
                    backgroundColor: "white", // Set background color to white
                    width: "300px", // Set the width as needed
                    overflow: "hidden", // Hide overflowing content
                    //   marginTop: "6px",
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Typography
                  sx={{
                    p: 2,
                    borderColor: "#465462",
                    backgroundColor: "#465462",
                    width: "400px",
                    overflow: "hidden",
                    borderRadius: "25px",
                  }}
                >
                  <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                    <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                      {[1, 2, 3, 4].map((dt) => (
                        <div
                          key={dt}
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleClose();
                            setStatus(dt);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={status === dt}
                            readOnly
                          />
                          <span>
                            {dt === 1
                              ? "Placed"
                              : dt === 2
                              ? "Confirmed"
                              : dt === 3
                              ? "Delivered"
                              : dt === 4
                              ? "Cancel"
                              : "Unknown"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Typography>
              </Popover>
              {Loading ? (
                <AddingLightLoader />
              ) : (
                <div
                  className="cursor-pointer bg-custom-bg hover:bg-custom-bg-hover px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-fit text-center font-montserrat"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const response = await UpdateProductOrderApi(
                        orderDetails._id,
                        {
                          status: status,
                        }
                      );
                      if (response.data.success) {
                        SuccessToast("Status updated successfully!");
                        dispatch(fetchProductsOrders());
                        setOpen(false);
                      } else {
                        ErrorToast("Unable to update status");
                      }
                    } catch (err) {
                      console.log(err);
                      ErrorToast(err.response?.data?.error?.msg || err.message);
                    }
                    setLoading(false);
                  }}
                >
                  Update Status
                </div>
              )}
              <div
                className="cursor-pointer bg-[gray] hover:bg-[#a9a9a9] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
                onClick={() => setOpen(false)}
              >
                Close
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ShowOrderDetailsModal;
