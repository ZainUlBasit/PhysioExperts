import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaPhoneVolume } from "react-icons/fa";
import { fetchAppointment } from "../../store/Slices/AppointmentSlice";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import CustomTextBox from "../Inputs/CustomTextBox";
import { FaLocationDot, FaSquarePhone } from "react-icons/fa6";
import moment from "moment";

const PrescriptionPreview = () => {
  const { id: AppointmentId } = useParams();
  // return;
  const [FetchingLoading, setFetchingLoading] = useState(false);
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
  }, []);

  useEffect(() => {
    if (AppointmentState.data) {
    }
  }, [AppointmentState.data]);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {!FetchingLoading && (
        <div className="mt-[12vh] flex items-center justify-center gap-x-3 relative w-full">
          <button
            className="px-2 py-2 border-2 border-black hover:rounded-lg transition-all ease-in-out duration-500 hover:bg-gray-600 bg-black text-custom-bg hover:text-white cursor-pointer w-[200px] flex justify-center items-center font-bold my-3 hover:bg-custom-bg hover:border-custom-bg"
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
          >
            PRINT
          </button>
          <div
            className="border-2 border-black px-2 py-2 rounded-full hover:text-white hover:bg-black transition-all ease-in-out duration-700 cursor-pointer absolute top-0 left-5"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </div>
        </div>
      )}

      {AppointmentState.loading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <AddingLightLoader />
        </div>
      ) : (
        AppointmentState.data &&
        AppointmentState.data
          .filter((dt) => {
            console.log(dt._id === AppointmentId);
            return dt._id === AppointmentId;
          })
          .map((dt) => {
            return (
              <div
                ref={contentToPrint}
                className="flex flex-col w-auto justify-between h-[1123px] border-2 border-custom-bg"
              >
                <div className="">
                  <div className="flex items-center gap-x-2 gap-y-2 border-b-2 border-b-custom-bg px-4 justify-center overflow-hidden py-4 pt-10">
                    <div className="text-custom-bg font-montserrat">
                      <div className="font-bold text-3xl text-center">
                        Physio Rehab Center Peshawar
                      </div>
                      <div className=" text-center text-[1.1rem]">
                        We Provide Physiotherapy & Rehabilitation & Services
                      </div>
                      <div className="flex items-center gap-x-4 pt-2 font-semibold">
                        <div className="">Dr Muhammad Adnan PT</div>

                        <div className="flex items-centers">
                          <FaPhoneVolume />
                          0311-5821445
                        </div>
                      </div>
                    </div>
                    <img src="/logo.jpeg" alt="" className="w-[200px]" />
                  </div>
                  <div className="flex justify-around items-center font-montserrat py-2 font-semibold bg-custom-bg text-white">
                    <div className="">Name: {dt.patientId.name} </div>
                    <div className="">Age: {dt.patientId.age}</div>
                    <div className="capitalize">
                      Gender: {dt.patientId.gender}
                    </div>
                    <div className="">
                      Date:{" "}
                      {moment(new Date(dt.date * 1000)).format("DD/MM/YYYY")}
                    </div>
                  </div>
                  <div className="flex h-full">
                    <div className="flex flex-col justify-around items-center py-7 px-2 border-r-2 border-r-custom-bg h-[94%]">
                      <CustomTextBox
                        label={"History & Complaints"}
                        Value={dt.prescription.history_complaints}
                      />
                      <CustomTextBox
                        label={"Assessment"}
                        Value={dt.prescription.assessment}
                      />
                      <CustomTextBox
                        label={"Differential Diagnosis"}
                        Value={dt.prescription.differential_diagnosis}
                      />
                      <CustomTextBox
                        label={"Management"}
                        Value={dt.prescription.management}
                      />
                      <CustomTextBox
                        label={"Remarks"}
                        Value={dt.prescription.remarks}
                      />
                    </div>
                    <div className="flex items-start justify-center gap-x-2 py-2">
                      {dt.prescription.exercises.map((url) => {
                        return (
                          <img src={url} className="w-[200px] object-contain" />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full border-t-2 border-t-custom-bg text-white bg-custom-bg px-2 py-2">
                  <div className="flex items-center gap-x-2">
                    <FaLocationDot /> B-1 Basement Dabgari Garden Peshawar
                  </div>
                  <div className="flex items-center gap-x-2">
                    <FaSquarePhone />
                    091-9224400-7 / Extension: 2239
                  </div>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
};

export default PrescriptionPreview;
