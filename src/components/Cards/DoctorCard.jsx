import React from "react";
import DcotorImage from "../../assets/doctor.jpg";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ Detail }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-start items-center w-[350px] relative bg-[white] text-custom-bg h-[400px] rounded-[20px] px-4 pt-[70px] gap-y-3 border-4 border-custom-bg-hover"
      onClick={() => {
        navigate("/add-appointment");
      }}
    >
      <div className="font-bold text-2xl">{Detail.title}</div>
      <div className="text-xl font-light">PHYSIOTHERAPIST</div>
      <div className="px-5 text-2xl font-[300px] text-center">
        As the senior doctor in East Forge, Dr. Patel specializes in gynecologic
        surgery and obstetric care.
      </div>
      <div className="py-3 flex justify-between items-center gap-x-3">
        <FaStar className="text-3xl text-yellow-400" />
        <FaStar className="text-3xl text-yellow-400" />
        <FaStar className="text-3xl text-yellow-400" />
        <FaStar className="text-3xl text-yellow-400" />
        <FaStar className="text-3xl text-yellow-400" />
      </div>
      <div className="absolute -top-[35%] left-1/2 transform -translate-x-1/2 h-[200px] w-[200px] rounded-full bg-custom-bg-hover overflow-hidden p-5">
        <img
          src={DcotorImage}
          className="overflow-hidden w-full h-full object-cover rounded-full"
          alt="nothing"
        />
      </div>
    </div>
  );
};

export default DoctorCard;
