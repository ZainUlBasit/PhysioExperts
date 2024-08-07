import React, { useState } from "react";
import PatientNavbar from "../../components/Navbar/PatientNavbar";

const PatientDashboard = () => {
  const [CurrentTab, setCurrentTab] = useState("Exercises");

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
    </div>
  );
};

export default PatientDashboard;
