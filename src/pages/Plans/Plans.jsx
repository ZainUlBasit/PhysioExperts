import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-aliceblue w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col min-h-[85vh] justify-center items-center gap-x-4 bg-aliceblue">
        <div
          className="text-[4rem] font-[600] font-montserrat text-custom-bg"
          style={{ textShadow: "#768A9E 1px 0 10px" }}
        >
          Choose Your Plan
        </div>
        <div className="flex gap-x-4 flex-wrap py-10 justify-center gap-y-4">
          <div className="w-[400px] min-h-[450px] flex flex-col gap-y-6 justify-center items-center font-montserrat px-3 py-4 border-4 border-custom-bg-hover bg-custom-bg-hover text-white rounded-2xl">
            <div className="font-bold text-4xl">Basic</div>
            <div className="font-bold text-2xl">FREE</div>
            <div className=" text-center text-xl px-2">
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Duration:</div>
                <div className="">7 days</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Appointments:</div>
                <div className="">2 per day</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Picture Exercise:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Video Exercise:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Doctor Dashboard:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Print Prescription:</div>
                <div className="">With Watermark</div>
              </div>
            </div>
            <div
              className="bg-[#52a614] text-white font-bold text-2xl px-4 py-3 rounded-lg cursor-pointer"
              onClick={() => {
                navigate("/doctor/registration");
              }}
            >
              Register
            </div>
          </div>

          <div className="w-[400px] min-h-[450px] flex flex-col gap-y-6 justify-center items-center font-montserrat px-3 py-4 border-4 border-custom-bg bg-custom-bg text-white rounded-2xl">
            <div className="font-bold text-4xl">Premium</div>
            <div className="font-bold text-2xl">3000 per Month</div>
            <div className="text-center text-xl px-2">
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Duration:</div>
                <div className="">3 Months</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Appointments:</div>
                <div className="">20 per day</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Picture Exercise:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Video Exercise:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Doctor Dashboard:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Print Prescription:</div>
                <div className="">No Watermark</div>
              </div>
            </div>
            <div
              className="bg-[#52a614] text-white font-bold text-2xl px-4 py-3 rounded-lg cursor-pointer"
              onClick={() => {
                navigate("/doctor/registration");
              }}
            >
              Register
            </div>
          </div>

          <div className="w-[400px] min-h-[450px] flex flex-col gap-y-6 justify-center items-center font-montserrat px-3 py-4 border-4 border-[#FFD700] bg-[#FFD700] text-custom-bg rounded-2xl">
            <div className="font-bold text-4xl">Standard</div>
            <div className="font-bold text-2xl">2500 per Month</div>
            <div className="text-center text-xl px-2">
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Duration:</div>
                <div className="">12 Months</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Appointments:</div>
                <div className="">Unlimited</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Picture Exercise:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Video Exercise:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Doctor Dashboard:</div>
                <div className="">Full Access</div>
              </div>
              <div className="flex justify-center gap-x-1">
                <div className="font-bold text-lg">Print Prescription:</div>
                <div className="">No Watermark</div>
              </div>
            </div>
            <div
              className="bg-[#52a614] text-white font-bold text-2xl px-4 py-3 rounded-lg cursor-pointer"
              onClick={() => {
                navigate("/doctor/registration");
              }}
            >
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
