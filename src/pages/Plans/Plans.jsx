import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Plans = () => {
  return (
    <div className="bg-aliceblue w-screen h-screen justify-center items-center">
      <Navbar />
      <div className="flex flex-col h-[85vh] justify-center items-center gap-x-4">
        <div
          className="text-[4rem] font-[600] font-montserrat text-custom-bg mb-10"
          style={{ textShadow: "#768A9E 1px 0 10px" }}
        >
          Choose Your Plan
        </div>
        <div className="flex gap-x-4">
          <div className="w-[400px] h-[450px] flex flex-col gap-y-6 justify-center items-center font-montserrat px-3 py-4 border-4 border-[#82976e] text-custom-bg">
            <div className="font-bold text-4xl">PERSONAL</div>
            <div className="font-bold text-2xl">FREE</div>
            <div className=" text-center text-xl px-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
              doloribus eum neque voluptatibus at consequuntur, accusamus
              provident.
            </div>
            <div className="bg-[#52a614] text-white font-bold text-2xl px-4 py-3 rounded-lg">
              Learn More
            </div>
          </div>
          <div className="w-[400px] h-[450px] flex flex-col gap-y-6 justify-center items-center font-montserrat px-3 py-4 border-4 border-[#00c7fc] bg-[#00c7fc] text-custom-bg">
            <div className="font-bold text-4xl">PERSONAL</div>
            <div className="font-bold text-2xl">FREE</div>
            <div className=" text-center text-xl px-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
              doloribus eum neque voluptatibus at consequuntur, accusamus
              provident.
            </div>
            <div className="bg-[#006ea2] text-white font-bold text-2xl px-4 py-3 rounded-lg">
              Learn More
            </div>
          </div>
          <div className="w-[400px] h-[450px] flex flex-col gap-y-6 justify-center items-center font-montserrat px-3 py-4 border-4 border-[#00c19a] text-custom-bg">
            <div className="font-bold text-4xl">PERSONAL</div>
            <div className="font-bold text-2xl">FREE</div>
            <div className=" text-center text-xl px-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
              doloribus eum neque voluptatibus at consequuntur, accusamus
              provident.
            </div>
            <div className="bg-[#00c19a] text-white font-bold text-2xl px-4 py-3 rounded-lg">
              Learn More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
