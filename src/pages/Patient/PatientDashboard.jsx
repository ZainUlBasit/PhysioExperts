import React, { useEffect, useState } from "react";
import PatientNavbar from "../../components/Navbar/PatientNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientExercises } from "../../store/Slices/PatientExercisesSlice";
import PageLoader from "../../components/Loaders/PageLoader";
import Exercises from "./Exercises";
import Videos from "./Videos";

const PatientDashboard = () => {
  const [CurrentTab, setCurrentTab] = useState("Exercises");
  const AuthState = useSelector((state) => state.AuthState);
  const PatientExercisesState = useSelector(
    (state) => state.PatientExercisesState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPatientExercises(AuthState.data.patientId._id));
  }, []);

  return (
    <div>
      <PatientNavbar />
      <div className="w-full flex justify-center">
        <div className="w-[90%] flex justify-center items-center bg-[#EFE7EC] rounded-[40px] font-[700] text-[1.5rem] mt-5 mb-8">
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "Exercises"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("Exercises")}
          >
            Exercises
          </div>
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "Videos"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("Videos")}
          >
            Videos
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-3 flex-wrap gap-x-4 py-4 gap-y-4">
        {PatientExercisesState.loading ? (
          <div>
            <PageLoader />
          </div>
        ) : (
          <>
            {CurrentTab === "Exercises" ? (
              <Exercises exercises={PatientExercisesState?.data?.exercises} />
            ) : (
              CurrentTab === "Videos" && (
                <Videos videos={PatientExercisesState?.data?.videos} />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
