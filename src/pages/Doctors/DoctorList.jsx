import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import ProductCards from "../../components/Cards/ProductCards";
import DoctorCard from "../../components/Cards/DoctorCard";
import { ArrayOfCities } from "../../utils/Cities";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../store/Slices/DoctorSlice";

const DoctorList = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [SearchCityName, setSearchCityName] = useState("");
  const [SearchByName, setSearchByName] = useState("");

  const dispatch = useDispatch();
  const DoctorState = useSelector((state) => state.DoctorState);
  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

  return (
    <div className="bg-[aliceblue] w-screen h-fit min-h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col flex-1 justify-center items-center gap-y-4">
        <div className="flex gap-x-2 flex-wrap">
          {!city && (
            <>
              <input
                className="select-none font-montserrat font-semibold text-[1rem] text-custom-bg border-2 border-custom-bg-hover py-2 rounded-full transition-all ease-in-out duration-500 px-4 w-[300px] mb-6 outline-none"
                placeholder="Search City..."
                value={SearchCityName}
                onChange={(e) => setSearchCityName(e.target.value)}
                list="city-list"
              />
              <datalist id="city-list" className="max-h-[60vh] overflow-y-auto">
                {ArrayOfCities.map(({ name }) => {
                  return <option value={name} />;
                })}
              </datalist>
            </>
          )}
          <input
            className="select-none font-montserrat font-semibold text-[1rem] text-custom-bg border-2 border-custom-bg-hover py-2 rounded-full transition-all ease-in-out duration-500 px-4 w-[300px] mb-6 outline-none"
            placeholder="Search By Name..."
            value={SearchByName}
            onChange={(e) => setSearchByName(e.target.value)}
          />
        </div>
        <div className="font-[400] font-montserrat text-5xl pb-[130px] text-custom-bg">
          Meet our Doctors
        </div>
        <div className="flex items-center justify-center gap-x-10 flex-wrap gap-y-[150px]">
          {DoctorState.data &&
            DoctorState.data.map((dt) => <DoctorCard Detail={dt} />)}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
