import React from "react";

const SimpleBtn = ({ title, onClick }) => {
  return (
    <div
      className="py-2 px-4 border-2 border-custom-bg rounded-full hover:text-white hover:bg-custom-bg transition-all ease-in-out duration-500 cursor-pointer"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default SimpleBtn;
