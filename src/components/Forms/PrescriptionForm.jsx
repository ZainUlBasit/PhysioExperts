import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CustomInput from "../Inputs/CustomInput";
import DoctorNavbar from "../Navbar/DoctorNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment } from "../../store/Slices/AppointmentSlice";
import { useParams } from "react-router-dom";
import CustomPopOver from "../Inputs/CustomPopOver";
import { Popover, Typography } from "@mui/material";
import { fetchVideos } from "../../store/Slices/VideoSlice";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import CustomTextInput from "../Inputs/CustomTextInput";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  addExercise,
  deleteExercise,
  initailizeExercise,
} from "../../store/Slices/ExerciseSlice";
import { UpdatePrescriptionAPI } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      history_complaints: historyComplaints,
      assessment,
      differential_diagnosis: differentialDiagnosis,
      management,
      remarks,
      exercises: SelectedExerciseState.exercises,
    };

    try {
      const response = await UpdatePrescriptionAPI({
        id: CurrentState.prescription._id,
        payload: formData,
      });
      if (response.data.success) {
        SuccessToast("Prescription Updated successfully!");
      } else {
        ErrorToast("Unable to Update Prescription");
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
      s;
      ErrorToast(err.response?.data?.error?.msg || err?.message);
    }
  };

  const ExerciseState = useSelector((state) => state.VideoState);
  const SelectedExerciseState = useSelector(
    (state) => state.SelectedExerciseState
  );
  const CategoryState = useSelector((state) => state.CategoryState);

  useEffect(() => {
    dispatch(fetchVideos(2));
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

  return (
    <div className="flex flex-col bg-aliceblue min-h-screen">
      <DoctorNavbar />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <div className="my-8 font-montserrat font-bold text-xl text-custom-bg">
          Prescription
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
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
        <CustomPopOver
          label={"Exercises"}
          placeholder={"Select Exercises"}
          required={false}
          Value={"Select Exercises"}
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
              <div className="w-full flex flex-col justify-between gap-y-3 items-center">
                {CategoryState.data &&
                  CategoryState.data.map((cat) => {
                    return (
                      <div key={cat._id} className="flex flex-col items-center">
                        {ExerciseState.data.filter((dt) => {
                          return cat._id === dt.categoryId._id;
                        }).length === 0 ? null : (
                          <div className="py-4 font-montserrat text-xl font-bold">
                            {cat.name}
                          </div>
                        )}
                        <div className="flex flex-col items-center gap-y-2">
                          {ExerciseState.data &&
                            ExerciseState.data
                              .filter((dt) => {
                                return cat._id === dt.categoryId._id;
                              })
                              .map((dt) => (
                                <div
                                  key={dt._id}
                                  className="flex gap-x-3 items-center cursor-pointer"
                                  onClick={() => {
                                    dispatch(addExercise(dt.sourceUrl));
                                    handleClose();
                                  }}
                                >
                                  <img src={dt.sourceUrl} alt={dt.name} />
                                </div>
                              ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Typography>
        </Popover>
        <button
          type="submit"
          className="bg-custom-bg text-white px-6 py-3 my-7 font-montserrat rounded-full hover:bg-custom-bg-hover hover:text-aliceblue border-2 border-custom-bg hover:border-custom-bg-hover font-bold"
        >
          Update Prescription
        </button>
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
      </form>
    </div>
  );
};

export default PrescriptionForm;
