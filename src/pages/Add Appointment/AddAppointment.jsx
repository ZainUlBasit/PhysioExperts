import React, { useEffect, useState, useMemo } from "react";
import CustomPopOver from "../../components/Inputs/CustomPopOver";
import { Popover, Typography } from "@mui/material";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { IoSunnySharp } from "react-icons/io5";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navbar from "../../components/Navbar/Navbar";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../store/Slices/DoctorSlice";
import CustomInput from "../../components/Inputs/CustomInput";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { AddNewAppoitmentApi } from "../../Api_Requests/Api_Requests";
import { generateTimeSlots } from "../../utils/GenerateTimeSlots";
import { FaCaretSquareDown } from "react-icons/fa";
import { fetchSlots } from "../../store/Slices/SlotsSlice";
import moment from "moment";
import AddingLightLoader from "../../components/Loaders/AddingLightLoader";

const AddAppointment = () => {
  const { id: DoctorId } = useParams();
  const currentDate = moment(new Date()).format("yyyy-MM-DD");

  const [selectedDate, setSelectedDate] = useState(dayjs(currentDate));
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const { DoctorState, AuthState, SlotsState } = useSelector((state) => ({
    DoctorState: state.DoctorState,
    AuthState: state.AuthState,
    SlotsState: state.SlotsState,
  }));
  const dispatch = useDispatch();
  const [CurrentSlots, setCurrentSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    const tempUser = DoctorState.data.find(
      (dt) => dt._id === DoctorId
    )?.clinic_timing;
    if (tempUser) setCurrentSlots(tempUser);
  }, [DoctorState.data, DoctorId]);

  useEffect(() => {
    if (CurrentSlots.length > 0 && selectedDate) {
      const selectedDay = dayjs(selectedDate).format("dddd");
      const selectedDaySlots = CurrentSlots.find(
        (slot) => slot.day === selectedDay
      );
      if (selectedDaySlots) {
        const start = selectedDaySlots.from;
        const end = selectedDaySlots.to;
        const generatedTimeSlots = generateTimeSlots(start, end);
        setTimeSlots(generatedTimeSlots);

        dispatch(
          fetchSlots({
            doctorId: DoctorId,
            slots: generatedTimeSlots,
            date: selectedDate,
            available: selectedDaySlots.available,
          })
        );
      }
    }
  }, [CurrentSlots, selectedDate, DoctorId, dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [ConsultType, setConsultType] = useState("");

  const selectedDaySlots = useMemo(() => {
    const selectedDay = dayjs(selectedDate).format("dddd");
    return CurrentSlots.find((slot) => slot.day === selectedDay);
  }, [selectedDate, CurrentSlots]);

  const [SelectedSlot, setSelectedSlot] = useState("");
  const [anchorElSlots, setAnchorElSlots] = useState(null);

  const handleClickSlots = (event) => {
    setAnchorElSlots(event.currentTarget);
  };

  const handleCloseSlots = () => {
    setAnchorElSlots(null);
  };

  const openSlots = Boolean(anchorElSlots);
  const idSlots = openSlots ? "simple-popover" : undefined;

  useEffect(() => {
    setSelectedSlot("");
  }, [selectedDaySlots, selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-aliceblue w-screen min-h-screen">
        <Navbar />
        <div className="h-full w-screen flex flex-col">
          <div
            className="w-full text-custom-bg font-[400] font-montserrat text-7xl flex justify-center items-center py-7"
            style={{ textShadow: "#768A9E 1px 0 10px" }}
          >
            Book Your Appointment
          </div>
          <div className="flex-1 flex justify-around flex-wrap pt-8 gap-y-10">
            <div className="flex flex-col justify-start gap-y-5 items-center w-[50%]">
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
              <div className="w-fit min-w-[400px] border-2 border-[#465462] rounded-[30px] overflow-hidden">
                <StaticDatePicker
                  sx={{ bgcolor: "aliceblue" }}
                  displayStaticWrapperAs="desktop"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              {selectedDaySlots?.available ? (
                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="text-[green] font-bold font-montserrat text-xl">
                    Available Time
                  </div>
                  <div className="font-montserrat font-semibold text-xl text-custom-bg my-4">
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
                      className="min-w-[400px] border-2 flex justify-center rounded-full font-montserrat font-[400] items-center border-[#465462] text-lg text-custom-bg cursor-pointer py-3"
                    >
                      <span className="text-xl">
                        {SelectedSlot ? (
                          SelectedSlot
                        ) : (
                          <span className="flex items-center gap-x-4">
                            Select Slot <FaCaretSquareDown />
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-[red] font-bold font-montserrat text-3xl">
                  Unavailable
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
                      {timeSlots.map((dt, index) => (
                        <div
                          key={index}
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

            <div className="flex flex-col flex-wrap gap-x-4 gap-y-4 justify-start items-center w-[50%] min-w-[500px]">
              <div className="font-montserrat font-bold text-2xl py-3 text-custom-bg">
                Patient Details
              </div>
              <div className="flex flex-col items-center">
                <CustomInput
                  Value={name}
                  setValue={setName}
                  Type={"text"}
                  label={"Name"}
                  required={true}
                  placeholder={"Enter Name"}
                />
                <CustomInput
                  Value={email}
                  setValue={setEmail}
                  Type={"email"}
                  label={"Email"}
                  required={true}
                  placeholder={"Enter Email"}
                />
                <CustomInput
                  Value={mobile_no}
                  setValue={setMobile_no}
                  Type={"text"}
                  label={"Mobile No"}
                  required={true}
                  placeholder={"Enter Mobile No"}
                />
                <CustomInput
                  Value={age}
                  setValue={setAge}
                  Type={"number"}
                  label={"Age"}
                  required={true}
                  placeholder={"Enter Age"}
                />

                <CustomInput
                  Value={address}
                  setValue={setAddress}
                  Type={"text"}
                  label={"Address"}
                  required={true}
                  placeholder={"Enter Address"}
                />
                <div className="flex gap-x-2 items-center justify-center font-montserrat">
                  <label className="font-montserrat font-medium text-lg">
                    Gender:
                  </label>
                  <div className="flex gap-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                </div>
                {selectedDaySlots?.available && (
                  <div
                    className="w-[250px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer my-5"
                    onClick={async () => {
                      if (
                        !name ||
                        !address ||
                        !mobile_no ||
                        !age ||
                        !email ||
                        !gender
                      ) {
                        ErrorToast("Required fields are undefined!");
                      } else {
                        try {
                          const response = await AddNewAppoitmentApi({
                            time_slot: SelectedSlot,
                            name,
                            address,
                            mobile_no,
                            age,
                            email,
                            gender,
                            consult_type:
                              ConsultType === "Online Consultation"
                                ? 1
                                : "Physical Consultation"
                                ? 2
                                : 0,
                            date: selectedDate,
                            doctorId: DoctorId,
                            imageUrl:
                              "https://cdn-icons-png.freepik.com/512/1533/1533506.png",
                          });
                          if (response.data.success) {
                            SuccessToast(response.data?.data?.msg);
                            navigate("/");
                          }
                          console.log(response);
                        } catch (err) {
                          console.log(err);
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
      </div>
    </LocalizationProvider>
  );
};

export default AddAppointment;
