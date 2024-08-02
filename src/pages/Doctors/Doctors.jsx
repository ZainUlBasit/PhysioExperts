import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCards from "../../components/Cards/ServiceCards";
import { useNavigate } from "react-router-dom";
import { ArrayOfCities } from "../../utils/Cities";

const Doctors = () => {
  const navigate = useNavigate();
  const [SearchCityName, setSearchCityName] = useState("");
  return (
    <div className="bg-[aliceblue] w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex h-[85vh] justify-between items-start gap-y-4 px-10">
        <div className="flex flex-col justify-center items-center w-[660px]">
          <div className="select-none font-montserrat font-semibold text-4xl text-white bg-custom-bg py-6 rounded-lg transition-all ease-in-out duration-500 px-10 w-[500px] text-center uppercase mb-6">
            Choose City
          </div>
          <input
            className="select-none font-montserrat font-semibold text-xl text-custom-bg border-2 border-custom-bg-hover py-6 rounded-full transition-all ease-in-out duration-500 px-10 w-[500px] uppercase mb-6 outline-none"
            placeholder="Search City..."
            value={SearchCityName}
            onChange={(e) => setSearchCityName(e.target.value)}
          />
          {/* Choose City */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-6 py-6">
            {ArrayOfCities.filter((dt) =>
              dt.name.toLowerCase().startsWith(SearchCityName.toLowerCase())
            )
              .slice(0, 10)
              .map((dt) => {
                return (
                  <div
                    className="px-5 bg-white border-[2px] border-custom-bg-hover hover:bg-custom-bg hover:text-white transition-all ease-in-out duration-500 py-3 rounded-full text-center text-2xl cursor-pointer"
                    onClick={() => navigate("/doctors/" + dt.name)}
                  >
                    {dt.name}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="!w-[600px]">
          <img src="/pakistan.png" alt="testing" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Doctors;
