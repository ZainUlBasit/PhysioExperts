import React, { useState } from "react";
import CustomPopOver from "../../components/Inputs/CustomPopOver";
import { Popover, Typography } from "@mui/material";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { IoSunnySharp } from "react-icons/io5";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navbar from "../../components/Navbar/Navbar";
import { BsSearch } from "react-icons/bs";

const AddAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs("2022-04-17")); // Initialize the date state
  const [anchorEl, setAnchorEl] = useState(null);

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
  const [ConsultType, setConsultType] = useState("");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-[#b9cdf6] w-screen h-screen">
        <Navbar />
        <div className="h-[85vh] w-screen flex flex-col">
          <div
            className="w-full text-[#000] font-[400] font-montserrat text-7xl flex justify-center items-center py-7"
            style={{ textShadow: "#bb86fc 1px 0 10px" }}
          >
            Book Your Appointment
          </div>
          <div className="flex-1 flex justify-around pt-8">
            <div className="flex flex-col justify-start gap-y-5 items-center border-r-[1px] border-r-[#bb86fc] w-full">
              <CustomPopOver
                label={"Consultation Type"}
                placeholder={"Select Consultation Type"}
                required={false}
                Value={ConsultType}
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
                PaperProps={{
                  sx: {
                    borderRadius: "25px", // Add rounded corners
                    backgroundColor: "white", // Set background color to white
                    overflowY: "auto", // Add vertical scroll
                  },
                }}
              >
                <Typography
                  sx={{
                    p: 2,
                    borderColor: "#bb86fc",
                    backgroundColor: "#bb86fc",
                    width: "400px",
                    borderRadius: "25px",
                    overflowY: "auto", // Ensure vertical scroll if needed
                    maxHeight: "60vh", // Set height to 60vh
                  }}
                >
                  <div className="bg-[#bb86fc] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                    <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                      {["Online Consultation", "Physical Consultation"].map(
                        (dt) => (
                          <div
                            key={dt}
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              handleClose();
                              setConsultType(dt);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={ConsultType === dt}
                              readOnly
                            />
                            <span>{dt}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Typography>
              </Popover>
              <div className="w-fit min-w-[400px]">
                <StaticDatePicker
                  sx={{ bgcolor: "#b9cdf6" }}
                  displayStaticWrapperAs="desktop"
                  value={selectedDate}
                  onChange={handleDateChange} // Handle date changes
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-center w-full gap-y-4">
              <div className="text-4xl pb-4">
                Select a time on{" "}
                {moment(new Date(selectedDate)).format("DD MMMM YYYY")}
              </div>
              <IoSunnySharp className="text-5xl text-black" />
              <div className="font-[400] text-4xl">Afternoon</div>
              <div className="flex flex-col gap-y-2 pt-3">
                <div className="p-2 px-3 shadow-lg text-[#bb86fc] border-[#bb86fc] border-[1px] rounded-lg bg-white text-2xl font-[400]">
                  3:30 PM
                </div>
                <div className="p-2 px-3 shadow-lg text-[#bb86fc] border-[#bb86fc] border-[1px] rounded-lg bg-white text-2xl font-[400]">
                  4:00 PM
                </div>
                <div className="p-2 px-3 shadow-lg text-[#bb86fc] border-[#bb86fc] border-[1px] rounded-lg bg-white text-2xl font-[400]">
                  4:30 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default AddAppointment;
