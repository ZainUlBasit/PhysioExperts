import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import ProductCards from "../../components/Cards/ProductCards";
import DoctorCard from "../../components/Cards/DoctorCard";
import { ArrayOfCities } from "../../utils/Cities";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../store/Slices/DoctorSlice";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import Search from "../../components/SearchBox/Search";
import { Popover, Typography } from "@mui/material";

const DoctorList = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [SearchCityName, setSearchCityName] = useState(city || "");
  const [SearchByName, setSearchByName] = useState("");

  const dispatch = useDispatch();
  const DoctorState = useSelector((state) => state.DoctorState);
  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [SearchCity, setSearchCity] = useState("");

  return (
    <div className="bg-[aliceblue] w-screen h-fit min-h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col flex-1 justify-center items-center gap-y-4">
        <div className="flex gap-x-2 flex-wrap">
          {!city && (
            <>
              <div
                className={`relative ${
                  true ? "w-[297px]" : "min-w-[300px] w-[400px]"
                } font-[Quicksand]  h-[48px] bg-aliceblue`}
                onClick={handleClick}
              >
                <p className="absolute top-[-11px] left-5 w-fit bg-aliceblue font-montserrat text-[1rem] font-semibold">
                  Select City
                </p>
                <div className="px-4 py-3 pr-10 border-2 border-[#000] w-full outline-none cursor-pointer shadow-[#0e25802d_0px_2px_8px_0px] h-full flex items-center font-normal text-[1.2rem] rounded-full">
                  {SearchCityName === "" ? "Select City" : SearchCityName}
                </div>
                <BsChevronDown className="flex absolute right-3 top-[.85rem] text-2xl" />
              </div>
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
                    width: "297px",
                    borderRadius: "25px",
                    overflowY: "auto",
                    maxHeight: "30vh",
                  }}
                >
                  <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                    <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                      <Search
                        Value={SearchCity}
                        setValue={setSearchCity}
                        Placeholder={"Search City..."}
                      />
                      {ArrayOfCities.filter((dt) => {
                        const cityNameLowerCase = dt.name.toLowerCase();
                        const searchCityNameLowerCase =
                          SearchCity.toLowerCase();

                        return (
                          SearchCity === "" ||
                          cityNameLowerCase.includes(searchCityNameLowerCase)
                        );
                      }).map((dt) => (
                        <div
                          key={dt.name}
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleClose();
                            setSearchCityName(dt.name);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={SearchCityName === dt.name}
                            readOnly
                          />
                          <span>{dt.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Typography>
              </Popover>
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
            DoctorState.data
              .filter((dt) => {
                const cityNameLowerCase = dt.name.toLowerCase();
                const SearchByNameLowerCase = SearchByName.toLowerCase();

                return (
                  (SearchCityName === dt.address || SearchCityName === "") &&
                  (SearchByName === "" ||
                    cityNameLowerCase.includes(SearchByNameLowerCase))
                );
              })
              .map((dt) => <DoctorCard Detail={dt} />)}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
