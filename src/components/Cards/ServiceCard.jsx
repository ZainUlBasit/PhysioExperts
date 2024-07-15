import React from "react";

const ServiceCard = ({ dt }) => {
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden gap-y-5 my-4">
      <div className="rounded-[50px] overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
        <img
          src={dt.img}
          alt="nothing"
          className="object-cover w-[210px] h-[300px]"
        />
      </div>
      <div className="font-bold font-montserrat text-2xl text-center w-[250px] text-custom-bg-hover">
        {dt.title}
      </div>
    </div>
  );
};

export default ServiceCard;
