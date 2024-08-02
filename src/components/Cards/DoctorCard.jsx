import React from "react";
import DcotorImage from "../../assets/doctor.jpg";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ Detail }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-between items-center w-[350px] relative bg-[white] text-custom-bg h-[400px] rounded-[50px] px-4 pt-[70px] gap-y-3 border-4 border-custom-bg-hover"
      onClick={() => {
        navigate("/add-appointment/" + Detail._id);
      }}
    >
      <div className="flex flex-col justify-center items-center gap-y-1">
        <div className="font-bold text-2xl font-montserrat">{Detail.name}</div>
        <div className="text-[1.1rem] font-light font-montserrat mb-2">
          PHYSIOTHERAPIST
        </div>
        <div className="px-5 font-[300px] text-center font-montserrat text-[1.1rem]">
          As the senior doctor in East Forge, Dr. Patel specializes in
          gynecologic surgery and obstetric care.
        </div>
      </div>
      <div className="py-6 flex justify-between items-center gap-x-3">
        <FaStar className="text-3xl text-yellow-400" />
        <FaStar className="text-3xl text-yellow-400" />
        <FaStar className="text-3xl text-yellow-400" />
        <FaStar className="text-3xl text-yellow-400" />
        <FaStar className="text-3xl text-yellow-400" />
      </div>
      <div className="absolute -top-[25%] left-1/2 transform -translate-x-1/2 h-[150px] w-[150px] rounded-full bg-custom-bg-hover overflow-hidden p-1 shadow-md">
        <img
          src={Detail.imageUrl}
          className="overflow-hidden w-full h-full object-cover rounded-full"
          alt="nothing"
        />
      </div>
    </div>
  );
};

export default DoctorCard;
