import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCards from "../../components/Cards/ServiceCards";

const Doctors = () => {
  return (
    <div className="bg-[#b9cdf6] w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex h-[85vh] justify-center items-center gap-y-4">
        <div className="flex flex-col justify-center items-center">
          <div className="select-none font-montserrat font-semibold text-4xl text-white bg-[#bb86fc] hover:bg-[#a871eb] py-6 rounded-lg transition-all ease-in-out duration-500 px-10 w-[500px] text-center uppercase mb-6">
            Choose City
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-6 py-6">
            {["Islamabad", "Karachi", "Lahore", "Peshawar", "Mardan"].map(
              (dt) => {
                return (
                  <div className="px-6 bg-white border-[1px] border-black py-7 rounded-full w-[300px] text-center text-4xl cursor-pointer">
                    {dt}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="!w-[1000px]">
          <img src="/pakistan.png" alt="testing" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Doctors;
