import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCards from "../../components/Cards/ServiceCards";
import { useNavigate } from "react-router-dom";
import { ArrayOfCities } from "../../utils/Cities";

const Doctors = () => {
  const navigate = useNavigate();
  const [SearchCityName, setSearchCityName] = useState("");
  return (
    <div className="bg-[#b9cdf6] w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex h-[85vh] justify-center items-center gap-y-4">
        <div className="flex flex-col justify-center items-center max-w-[660px]">
          <div className="select-none font-montserrat font-semibold text-4xl text-white bg-[#a871eb] py-6 rounded-lg transition-all ease-in-out duration-500 px-10 w-[500px] text-center uppercase mb-6">
            Choose City
          </div>
          <input
            className="select-none font-montserrat font-semibold text-xl text-[#a871eb] border-2 border-[#a871eb] py-6 rounded-lg transition-all ease-in-out duration-500 px-10 w-[500px] uppercase mb-6 outline-none"
            placeholder="Search City..."
            value={SearchCityName}
            onChange={(e) => setSearchCityName(e.target.value)}
          />
          {/* Choose City */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-6 py-6">
            {ArrayOfCities.filter((dt) =>
              dt.name.toLowerCase().startsWith(SearchCityName.toLowerCase())
            )
              .slice(0, 4)
              .map((dt) => {
                return (
                  <div
                    className="px-6 bg-white border-[2px] border-[#bb86fc] hover:bg-[#bb86fc] hover:text-white transition-all ease-in-out duration-500 py-7 rounded-full text-center text-4xl cursor-pointer"
                    onClick={() => navigate("/doctors/" + dt)}
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
