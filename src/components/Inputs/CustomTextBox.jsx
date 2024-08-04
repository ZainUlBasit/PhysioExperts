import React from "react";
import "./AuthInput.css";

const CustomTextBox = ({ label, Value }) => {
  return (
    <div className="relative mb-[15px] w-[250px] maxInputWidth font-[Quicksand]">
      <p className="absolute top-[-11px] left-3 w-fit bg-[white] text-custom-bg h-[13px] text-[15px] font-bold InputLabel font-montserrat">
        {label}
      </p>
      <div className="px-3 py-2 border-2 border-custom-bg rounded-[7.94px] w-full outline-none InputText font-montserrat min-h-[10vh] text-sm font-semibold text-custom-bg">
        {Value}
      </div>
    </div>
  );
};

export default CustomTextBox;
