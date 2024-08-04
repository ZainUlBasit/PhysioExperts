import React, { useEffect, useMemo, useState } from "react";
import PatientNavbar from "../../components/Navbar/PatientNavbar";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomPopOver from "../../components/Inputs/CustomPopOver";
import { Popover, Typography } from "@mui/material";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { fetchDoctors } from "../../store/Slices/DoctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoSunnySharp } from "react-icons/io5";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AddAppoitmentPatientApi } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { generateTimeSlots } from "../../utils/GenerateTimeSlots";
import { FaCaretSquareDown } from "react-icons/fa";
import { fetchSlots } from "../../store/Slices/SlotsSlice";
import moment from "moment";
import AddingLightLoader from "../../components/Loaders/AddingLightLoader";

const PatientNewAppoinment = () => {
  const [DoctorId, setDoctorId] = useState("");
  const [CurrentSlots, setCurrentSlots] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElDoctor, setAnchorElDoctor] = useState(null);
  const [anchorElSlots, setAnchorElSlots] = useState(null);
  const [ConsultType, setConsultType] = useState("");
  const [SelectedDoctorId, setSelectedDoctorId] = useState("");
  const [SelectedDoctorName, setSelectedDoctorName] = useState("");
  const currentDate = moment(new Date()).format("yyyy-MM-DD");
  const [selectedDate, setSelectedDate] = useState(dayjs(currentDate));
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClickDoctor = (event) => {
    setAnchorElDoctor(event.currentTarget);
  };

  const handleCloseDoctor = () => {
    setAnchorElDoctor(null);
  };

  const openDoctor = Boolean(anchorElDoctor);
  const idDoctor = openDoctor ? "simple-popover" : undefined;
  const handleClickSlots = (event) => {
    setAnchorElSlots(event.currentTarget);
  };

  const handleCloseSlots = () => {
    setAnchorElSlots(null);
  };

  const openSlots = Boolean(anchorElSlots);
  const idSlots = openSlots ? "simple-popover" : undefined;

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const { DoctorState, AuthState, SlotsState } = useSelector((state) => ({
    DoctorState: state.DoctorState,
    AuthState: state.AuthState,
    SlotsState: state.SlotsState,
  }));

  useEffect(() => {
    const tempUser = DoctorState.data.find(
      (dt) => dt._id === SelectedDoctorId
    )?.clinic_timing;
    if (tempUser) setCurrentSlots(tempUser);
  }, [DoctorState.data, SelectedDoctorId]);

  const selectedDaySlots = useMemo(() => {
    const selectedDay = dayjs(selectedDate).format("dddd");
    return CurrentSlots.find((slot) => slot.day === selectedDay);
  }, [selectedDate, CurrentSlots]);

  const start = selectedDaySlots?.from;
  const end = selectedDaySlots?.to;
  const timeSlots = generateTimeSlots(start, end);
  const [SelectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    if (selectedDate && SelectedDoctorId) {
      dispatch(
        fetchSlots({
          doctorId: SelectedDoctorId,
          slots: timeSlots,
          date: selectedDate,
          available: selectedDaySlots?.available,
        })
      );
      console.log(SlotsState.data);
    }
  }, [selectedDate, SelectedDoctorId]);

  return (
    <div className="bg-aliceblue min-h-screen">
      <PatientNavbar />
      <div className="h-full w-screen flex flex-col bg-aliceblue">
        <div
          className="w-full text-custom-bg font-[400] font-montserrat text-7xl flex justify-center items-center py-7"
          style={{ textShadow: "#768A9E 1px 0 10px" }}
        >
          Book Your Appointment
        </div>
        <div className="flex-1 flex justify-around flex-wrap pt-8 gap-y-10">
          <div className="flex flex-col justify-start gap-y-6 items-center w-[50%]">
            <CustomPopOver
              label={"Consultation Type"}
              placeholder={"Select Consultation Type"}
              required={false}
              Value={ConsultType}
              onClick={handleClick}
            />
            <CustomPopOver
              label={"Select Doctor"}
              placeholder={"Select Doctor"}
              required={false}
              Value={SelectedDoctorName}
              onClick={handleClickDoctor}
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
                  borderRadius: "25px",
                  backgroundColor: "white",
                  overflowY: "auto",
                },
              }}
            >
              <Typography
                sx={{
                  p: 2,
                  borderColor: "#465462",
                  backgroundColor: "#465462",
                  width: "400px",
                  borderRadius: "25px",
                  overflowY: "auto",
                  maxHeight: "60vh",
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
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
            <Popover
              id={idDoctor}
              open={openDoctor}
              anchorEl={anchorElDoctor}
              onClose={handleCloseDoctor}
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
                  borderRadius: "25px",
                  backgroundColor: "white",
                  overflowY: "auto",
                },
              }}
            >
              <Typography
                sx={{
                  p: 2,
                  borderColor: "#465462",
                  backgroundColor: "#465462",
                  width: "400px",
                  borderRadius: "25px",
                  overflowY: "auto",
                  maxHeight: "60vh",
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                  <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                    {DoctorState.data &&
                      DoctorState.data.map((dt) => (
                        <div
                          key={dt._id}
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseDoctor();
                            setDoctorId(dt._id);
                            setSelectedDoctorName(dt.name);
                            setSelectedDoctorId(dt._id);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={SelectedDoctorId === dt._id}
                            readOnly
                          />
                          <span>{dt.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </Typography>
            </Popover>
            {SelectedDoctorId && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="w-fit min-w-[400px] border-2 border-[#465462] rounded-[30px] overflow-hidden">
                  <StaticDatePicker
                    sx={{ bgcolor: "aliceblue" }}
                    displayStaticWrapperAs="desktop"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
              </LocalizationProvider>
            )}
            {SelectedDoctorId && selectedDaySlots?.available ? (
              <div className="flex flex-col items-center justify-center">
                <div className="text-[green] font-bold font-montserrat text-xl">
                  Available Time
                </div>
                <div className="font-montserrat font-semibold text-xl text-custom-bg">
                  {dayjs(selectedDaySlots?.from, "HH:mm").format("h:mm A")} -{" "}
                  {dayjs(selectedDaySlots?.to, "HH:mm").format("h:mm A")}
                </div>

                {SlotsState.loading ? (
                  <div>
                    <AddingLightLoader />
                  </div>
                ) : (
                  <div
                    onClick={handleClickSlots}
                    className="min-w-[200px] cursor-pointer border-2 border-custom-bg flex flex-col items-center rounded-lg"
                  >
                    <div className="bg-custom-bg text-white text-center py-2 font-montserrat font-bold flex w-full justify-center items-center gap-x-2">
                      Available Slots
                      <FaCaretSquareDown className="text-xl" />
                    </div>
                    <div className="py-3 font-montserrat font-bold">
                      {SelectedSlot ? SelectedSlot : "Select Slot"}
                    </div>
                  </div>
                )}
                <Popover
                  id={idSlots}
                  open={openSlots}
                  anchorEl={anchorElSlots}
                  onClose={handleCloseSlots}
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
                      borderRadius: "25px",
                      backgroundColor: "white",
                      overflowY: "auto",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      p: 2,
                      borderColor: "#465462",
                      backgroundColor: "#465462",
                      width: "400px",
                      borderRadius: "25px",
                      overflowY: "auto",
                      maxHeight: "60vh",
                    }}
                  >
                    <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                      <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                        {SlotsState.data &&
                          SlotsState.data.map((dt) => (
                            <div
                              key={dt}
                              className="flex gap-x-3 items-center cursor-pointer"
                              onClick={() => {
                                handleCloseSlots();
                                setSelectedSlot(dt);
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                                checked={SelectedSlot === dt}
                                readOnly
                              />
                              <span>{dt}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </Typography>
                </Popover>
              </div>
            ) : (
              SelectedDoctorId && (
                <div className="flex flex-col items-center justify-center">
                  <div className="text-[red] font-bold font-montserrat text-xl">
                    Not Available
                  </div>
                </div>
              )
            )}
            {SelectedDoctorId && selectedDaySlots?.available && (
              <div
                className="w-[250px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer my-5"
                onClick={async () => {
                  if (
                    !ConsultType ||
                    !SelectedDoctorId ||
                    !SelectedDoctorName ||
                    !SelectedSlot ||
                    !selectedDate
                  ) {
                    ErrorToast("Required fields are undefined!");
                  } else {
                    try {
                      const response = await AddAppoitmentPatientApi({
                        consult_type:
                          ConsultType === "Online Consultation"
                            ? 1
                            : "Physical Consultation"
                            ? 2
                            : 0,
                        date: selectedDate,
                        doctorId: SelectedDoctorId,
                        doctor_name: SelectedDoctorName,
                        patientId: AuthState.data.patientId._id,
                        patient_name: AuthState.data.patientId.name,
                        imageUrl: AuthState.data.patientId.imageUrl,
                        time_slot: SelectedSlot,
                      });
                      if (response.data.success) {
                        SuccessToast(response.data?.data?.msg);
                        setSelectedDoctorId("");
                        setSelectedDoctorName("");
                        setSelectedSlot("");
                      }
                    } catch (err) {
                      console.log(err);
                      ErrorToast(err.response.data.error.msg || err.message);
                    }
                  }
                }}
              >
                Add Appointment
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientNewAppoinment;
