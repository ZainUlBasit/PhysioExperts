import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import ProductCards from "../../components/Cards/ProductCards";
import DoctorCard from "../../components/Cards/DoctorCard";

const DoctorList = () => {
  const { city } = useParams();
  console.log(city);
  const navigate = useNavigate();
  if (!city) navigate("/doctors");

  return (
    <div className="bg-[aliceblue] w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col flex-1 justify-center items-center gap-y-4">
        <div className="font-[400] font-montserrat text-8xl pb-[130px] text-custom-bg">
          Meet our Doctors
        </div>
        <div className="flex gap-x-10">
          {[
            { title: "Dr. Samira Hadid, M.D.", img: "/NeckMassager.jpg" },
            { title: "Dr. Aryan Patel, M.D.", img: "/NeckMassager.jpg" },
            { title: "Dr. Yuqin Feng, M.D.", img: "/NeckMassager.jpg" },
          ].map((dt) => (
            <DoctorCard Detail={dt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
