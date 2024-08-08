import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CustomInput from "../Inputs/CustomInput";
import DoctorNavbar from "../Navbar/DoctorNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment } from "../../store/Slices/AppointmentSlice";
import { useNavigate, useParams } from "react-router-dom";
import CustomPopOver from "../Inputs/CustomPopOver";
import { Popover, Typography } from "@mui/material";
import { fetchVideos } from "../../store/Slices/VideoSlice";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import CustomTextInput from "../Inputs/CustomTextInput";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  addExercise,
  addVideos,
  deleteExercise,
  deleteVideo,
  initailizeExercise,
  initailizeVideos,
} from "../../store/Slices/ExerciseSlice";
import { UpdatePrescriptionAPI } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { BsChevronDown } from "react-icons/bs";
import { fetchExercises } from "../../store/Slices/VideoExerciesSlice";

const PrescriptionForm = () => {
  const { id: AppointmentId } = useParams();
  const [historyComplaints, setHistoryComplaints] = useState("");
  const [assessment, setAssessment] = useState("");
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState("");
  const [management, setManagement] = useState("");
  const [remarks, setRemarks] = useState("");
  const exercisesRef = useRef([]);
  const [date, setDate] = useState(Math.floor(Date.now() / 1000));
  const [CurrentState, setCurrentState] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const AppointmentState = useSelector((state) => state.AppointmentState);
  const AuthState = useSelector((state) => state.AuthState);

  useEffect(() => {
    const payload =
      AuthState.data.role === 2
        ? {
            type: "doctor",
            id: AuthState.data.doctorId._id,
          }
        : {
            type: "patient",
            id: AuthState.data.patientId._id,
          };
    dispatch(fetchAppointment(payload));
  }, [AuthState, dispatch]);

  useEffect(() => {
    if (AppointmentState.data) {
      setCurrentState(
        AppointmentState.data.find((dt) => dt._id === AppointmentId)
      );
    }
  }, [AppointmentState, AppointmentId]);

  useEffect(() => {
    if (CurrentState) {
      setDifferentialDiagnosis(
        CurrentState.prescription?.differential_diagnosis
      );
      setAssessment(CurrentState.prescription?.assessment);
      setHistoryComplaints(CurrentState.prescription?.history_complaints);
      setManagement(CurrentState.prescription?.management);
      setRemarks(CurrentState.prescription?.remarks);
      dispatch(initailizeExercise(CurrentState.prescription?.exercises || []));
      dispatch(initailizeVideos(CurrentState.prescription?.videos || []));
    }
  }, [CurrentState]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [anchorElVideos, setAnchorElVideos] = useState(null);

  const handleClickVideos = (event) => {
    setAnchorElVideos(event.currentTarget);
  };

  const handleCloseVideos = () => {
    setAnchorElVideos(null);
  };

  const openVideos = Boolean(anchorElVideos);
  const idVideos = openVideos ? "simple-popover" : undefined;

  const [anchorElA, setAnchorElA] = useState(null);

  const handleClickA = (event) => {
    setAnchorElA(event.currentTarget);
  };

  const handleCloseA = () => {
    setAnchorElA(null);
  };

  const openA = Boolean(anchorElA);
  const idA = openA ? "simple-popover" : undefined;

  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = {
      history_complaints: historyComplaints,
      assessment,
      differential_diagnosis: differentialDiagnosis,
      management,
      remarks,
      exercises: SelectedExerciseState.exercises,
      videos: SelectedExerciseState.videos,
    };

    try {
      const response = await UpdatePrescriptionAPI({
        app_id: AppointmentId,
        id: CurrentState.prescription._id,
        payload: formData,
      });

      if (response.data.success) {
        SuccessToast("Prescription Updated successfully!");
      } else {
        ErrorToast("Unable to Update Prescription");
      }
    } catch (err) {
      console.error("Error creating prescription:", err);
      ErrorToast(err.response?.data?.error?.msg || err?.message);
    }
    setLoading(false);
  };

  const ExerciseState = useSelector((state) => state.ExerciseState);
  const SelectedExerciseState = useSelector(
    (state) => state.SelectedExerciseState
  );
  const CategoryState = useSelector((state) => state.CategoryState);
  const VideoState = useSelector((state) => state.VideoState);

  useEffect(() => {
    dispatch(fetchVideos(2));
    dispatch(fetchExercises());
    dispatch(fetchCategories());
  }, [dispatch]);

  // const handleExerciseSelection = (exerciseUrl) => {
  //   const currentState = exercisesRef.current;
  //   if (currentState[0]) {
  //     exercisesRef.current = [...exercisesRef.current, exerciseUrl];
  //   } else {
  //     exercisesRef.current = [exerciseUrl];
  //   }

  //   handleClose();
  // };
  // const handleExerciseDeletion = (exerciseUrl) => {
  //   const currentState = exercisesRef.current;
  //   if (currentState[0]) {
  //     const filterList = currentState.filter((dt) => dt !== exerciseUrl);
  //     exercisesRef.current = filterList;
  //     console.log(exercisesRef.current);
  //   } else {
  //     alert("yes");
  //     exercisesRef.current = [];
  //   }

  //   handleClose();
  // };
  const [SelectedCity, setSelectedCity] = useState("");
  const [SelectedCat, setSelectedCat] = useState("");

  return (
    <div className="flex flex-col bg-aliceblue min-h-screen">
      <DoctorNavbar />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full"
      >
        <div className="my-8 font-montserrat font-bold text-xl bg-custom-bg text-white py-6 rounded-lg w-[90%] text-center">
          Prescription
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center">
          <div className="flex flex-col">
            <CustomTextInput
              Value={historyComplaints}
              setValue={setHistoryComplaints}
              Type={"text"}
              label={"History of Complaints"}
              required={false}
              placeholder={"Enter history of complaints"}
            />
            <CustomTextInput
              Value={assessment}
              setValue={setAssessment}
              Type={"text"}
              label={"Assessment"}
              required={false}
              placeholder={"Enter assessment"}
            />
          </div>
          <div className="flex flex-col">
            <CustomTextInput
              Value={differentialDiagnosis}
              setValue={setDifferentialDiagnosis}
              Type={"text"}
              label={"Differential Diagnosis"}
              required={false}
              placeholder={"Enter differential diagnosis"}
            />
            <CustomTextInput
              Value={management}
              setValue={setManagement}
              Type={"text"}
              label={"Management"}
              required={false}
              placeholder={"Enter management"}
            />
          </div>
        </div>
        <CustomTextInput
          Value={remarks}
          setValue={setRemarks}
          Type={"text"}
          label={"Remarks"}
          required={false}
          placeholder={"Enter remarks"}
        />
        <div className="flex flex-col gap-y-5">
          <CustomPopOver
            label={"Exercises"}
            placeholder={"Select Exercises"}
            required={false}
            Value={"Select Exercises"}
            onClick={handleClick}
          />
          <CustomPopOver
            label={"Videos"}
            placeholder={"Select Videos"}
            required={false}
            Value={"Select Videos"}
            onClick={handleClickVideos}
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
              <div className="bg-[#465462] font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                <div className="w-full flex flex-col justify-between gap-y-3 items-center">
                  {/* <select
                  value={SelectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="!text-black w-full px-2 py-2 rounded-full outline-none border-custom-bg-hover border-4"
                >
                  {CategoryState.data.map((dt) => (
                    <option value={dt.name}>{dt.name}</option>
                  ))}
                </select> */}
                  <div
                    className={`relative ${" w-[100%]"} font-[Quicksand]  h-[48px] bg-custom-bg`}
                    onClick={handleClickA}
                  >
                    <p className="absolute top-[-14px] left-3 w-fit bg-custom-bg text-white font-montserrat text-xl font-bold">
                      Exercises
                    </p>
                    <div className="px-3 py-6 pr-10 border-2 border-[#fff] rounded-[7.94px] w-full outline-none cursor-pointer shadow-[#0e25802d_0px_2px_8px_0px] h-full flex items-center font-bold text-[1.2rem] text-white">
                      {SelectedCat === ""
                        ? "Select Category"
                        : CategoryState.data.find(
                            (dt) => dt._id === SelectedCat
                          ).name}
                    </div>
                    <BsChevronDown className="flex absolute right-3 top-[.85rem] text-2xl text-white cursor-pointer" />
                  </div>

                  <Popover
                    id={idA}
                    open={openA}
                    anchorEl={anchorElA}
                    onClose={handleCloseA}
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
                      <div className="flex flex-col gap-y-2">
                        {CategoryState.data &&
                          CategoryState.data.map((dt) => {
                            return (
                              <div
                                key={dt._id}
                                className="flex gap-x-3 items-center cursor-pointer text-white"
                                onClick={() => {
                                  handleCloseA();
                                  setSelectedCat(dt._id);
                                }}
                              >
                                <input
                                  type="checkbox"
                                  className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                                  checked={SelectedCat === dt._id}
                                  readOnly
                                />
                                <span>{dt.name}</span>
                              </div>
                            );
                          })}
                      </div>
                    </Typography>
                  </Popover>

                  <div className="flex flex-col items-center gap-y-2">
                    {ExerciseState.data &&
                      ExerciseState.data.map((dt) => (
                        <div
                          key={dt._id}
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            dispatch(addExercise(dt.sourceUrl));
                            handleClose();
                          }}
                        >
                          <img
                            src={dt.sourceUrl}
                            alt="Image"
                            className="w-60 h-60 rounded-lg border-2 border-custom-bg-hover relative object-cover"
                            controls
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Typography>
          </Popover>
          <Popover
            id={idVideos}
            open={openVideos}
            anchorEl={anchorElVideos}
            onClose={handleCloseVideos}
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
              <div className="bg-[#465462] font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                <div className="w-full flex flex-col justify-between gap-y-3 items-center">
                  <div
                    className={`relative ${" w-[100%]"} font-[Quicksand]  h-[48px] bg-custom-bg`}
                    onClick={handleClickA}
                  >
                    <p className="absolute top-[-14px] left-3 w-fit bg-custom-bg text-white font-montserrat text-xl font-bold">
                      Videos
                    </p>
                    <div className="px-3 py-6 pr-10 border-2 border-[#fff] rounded-[7.94px] w-full outline-none cursor-pointer shadow-[#0e25802d_0px_2px_8px_0px] h-full flex items-center font-bold text-[1.2rem] text-white">
                      {SelectedCat === ""
                        ? "Select Category"
                        : CategoryState.data.find(
                            (dt) => dt._id === SelectedCat
                          ).name}
                    </div>
                    <BsChevronDown className="flex absolute right-3 top-[.85rem] text-2xl text-white cursor-pointer" />
                  </div>

                  <div className="flex flex-col items-center gap-y-2">
                    {VideoState.data &&
                      VideoState.data.map((dt) => (
                        <div
                          key={dt._id}
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            dispatch(addVideos(dt.sourceUrl));
                            handleClose();
                          }}
                        >
                          <video
                            key={dt._id}
                            src={dt?.sourceUrl}
                            alt="Video"
                            className="w-60 h-60 rounded-lg border-2 border-custom-bg-hover relative object-cover"
                            controls
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Typography>
          </Popover>
        </div>
        {
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            <button
              type="submit"
              className="bg-custom-bg text-white px-6 py-3 my-7 font-montserrat rounded-full hover:bg-custom-bg-hover hover:text-aliceblue border-2 border-custom-bg hover:border-custom-bg-hover font-bold"
            >
              Update Prescription
            </button>
            <div
              className="bg-custom-bg text-white px-6 py-3 my-7 font-montserrat rounded-full hover:bg-custom-bg-hover hover:text-aliceblue border-2 border-custom-bg hover:border-custom-bg-hover font-bold cursor-pointer"
              onClick={() => {
                navigate("/appointment/prescription/preview/" + AppointmentId);
              }}
            >
              Preview Prescription
            </div>
          </div>
        }
        <div className="w-full flex flex-col items-center">
          {SelectedExerciseState.exercises.length !== 0 && (
            <div className="w-[90%] bg-custom-bg text-center py-5 text-white rounded-full font-montserrat text-2xl font-bold">
              Selected Exercises
            </div>
          )}
          <div className="flex flex-wrap gap-x-2 gap-y-2 py-2">
            {SelectedExerciseState.exercises &&
              SelectedExerciseState.exercises.map((url) => {
                return (
                  <div className="relative border-2 border-custom-bg">
                    <img
                      className="w-[200px] object-contain"
                      src={url}
                      alt="Exercises"
                    />
                    <div
                      className="p-2 w-[40px] h-[40px] rounded-full absolute right-0 bottom-0 text-[red] font-montserrat font-bold text-center hover:text-[red] flex justify-center items-center transition-all ease-in-out duration-700 text-2xl hover:border-2 hover:border-[red]"
                      onClick={() => {
                        dispatch(deleteExercise(url));
                      }}
                    >
                      <RiDeleteBin2Fill />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          {SelectedExerciseState.videos.length !== 0 && (
            <div className="w-[90%] bg-custom-bg text-center py-5 text-white rounded-full font-montserrat text-2xl font-bold">
              Selected Exercises
            </div>
          )}
          <div className="flex flex-wrap gap-x-2 gap-y-2 py-2 justify-center">
            {SelectedExerciseState.videos &&
              SelectedExerciseState.videos.map((url) => (
                <div key={url} className="relative border-2 border-custom-bg">
                  <video
                    src={url}
                    alt="Video"
                    className="min-w-[200px] max-w-[400px] object-cover"
                    controls
                  />
                  <div
                    className="p-2 w-[40px] h-[40px] rounded-full absolute right-0 bottom-0 text-[red] font-montserrat font-bold text-center hover:text-[red] flex justify-center items-center transition-all ease-in-out duration-700 text-2xl hover:border-2 hover:border-[red]"
                    onClick={() => dispatch(deleteVideo(url))}
                  >
                    <RiDeleteBin2Fill />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionForm;
