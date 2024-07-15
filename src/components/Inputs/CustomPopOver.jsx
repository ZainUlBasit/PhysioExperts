import React from "react";
import { BsChevronDown } from "react-icons/bs";

const CustomPopOver = ({ label, placeholder, Value, onClick }) => {
  return (
    <div
      className="relative min-w-[300px] w-[400px] font-[Quicksand]  h-[48px]"
      onClick={onClick}
    >
      <p className="absolute top-[-14px] left-3 w-fit bg-aliceblue font-montserrat text-xl font-bold">
        {label}
      </p>
      <div className="px-3 py-6 pr-10 border-2 border-[#000] rounded-[7.94px] w-full outline-none cursor-pointer shadow-[#0e25802d_0px_2px_8px_0px] h-full flex items-center font-bold text-[1.2rem]">
        {Value === "" ? placeholder : Value}
      </div>
      <BsChevronDown className="flex absolute right-3 top-[.85rem] text-2xl" />
    </div>
  );
};

export default CustomPopOver;
