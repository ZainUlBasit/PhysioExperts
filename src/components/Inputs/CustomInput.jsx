import React from "react";
import "./AuthInput.css";

const CustomInput = ({
  Type,
  label,
  placeholder,
  required,
  Value,
  setValue,
  readonly,
  disabled,
}) => {
  return (
    <div className="relative mb-[15px] w-[297px] maxInputWidth font-[Quicksand]">
      <p className="absolute top-[-11px] left-3 w-fit bg-aliceblue text-custom-bg h-[13px] text-[18px] font-bold InputLabel font-montserrat">
        {label}
      </p>
      <input
        type={Type ? Type : "text"}
        required={required}
        placeholder={placeholder}
        className="px-3 py-3 border-2 border-custom-bg rounded-[7.94px] w-full outline-none InputText font-montserrat"
        value={Value}
        readOnly={readonly ? true : false}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value.length ? value : "");
        }}
        x
        disabled={disabled ? disabled : false}
      />
    </div>
  );
};

export default CustomInput;
