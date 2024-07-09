import React, { useState } from "react";
import CustomModal from "./CustomModal";
import { Popover } from "@mui/material";
import CustomPopOver from "../Inputs/CustomPopOver";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { IoSunnySharp } from "react-icons/io5";

const AddAppointmentModal = ({ Open, setOpen }) => {
  const [SearchPopOver, setSearchPopOver] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs("2022-04-17")); // Initialize the date state

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue); // Update the date state
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomModal open={Open} setOpen={setOpen}>
        <div className="h-screen w-screen flex flex-col">
          <div className="w-full text-[#b9cdf6] font-[400] font-montserrat text-7xl flex justify-center items-center py-7">
            Book Your Appointment
          </div>
          <div className="flex-1 flex justify-around">
            <div className="flex flex-col justify-center items-center border-r-2 border-r-gray-300 w-full">
              <CustomPopOver
                label={"Consultation Type"}
                placeholder={"Select Consultation Type"}
                required={false}
                Value={""}
                onClick={handleClick}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {/* Your popover content */}
              </Popover>
              <div className="w-fit min-w-[400px]">
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={selectedDate}
                  onChange={handleDateChange} // Handle date changes
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full gap-y-4">
              <div className="text-4xl pb-4">
                Select a time on{" "}
                {moment(new Date(selectedDate)).format("DD MMMM YYYY")}
              </div>
              <IoSunnySharp className="text-5xl text-black" />
              <div className="font-[400] text-4xl">Afternoon</div>
              <div className="flex flex-col gap-y-2 pt-3">
                <div className="p-2 px-3 shadow-lg bg-[#7ec837] text-white text-2xl font-[400]">
                  3:30 PM
                </div>
                <div className="p-2 px-3 shadow-lg bg-[#7ec837] text-white text-2xl font-[400]">
                  4:00 PM
                </div>
                <div className="p-2 px-3 shadow-lg bg-[#7ec837] text-white text-2xl font-[400]">
                  4:30 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </LocalizationProvider>
  );
};

export default AddAppointmentModal;
