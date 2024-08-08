import React from "react";
import "./BasicCard.css";

const BasicCard = () => {
  return (
    /* From Uiverse.io by mrhyddenn */
    <div class="container">
      <div class="card_box">
        <div className="flex items-center justify-center h-full">
          <div className=" text-center text-xl px-2 flex flex-col font-montserrat text-white">
            <div className="font-bold text-2xl">FREE</div>
            <div className="flex justify-center gap-x-1">
              <div className="font-bold text-lg">Duration:</div>
              <div className="">7 days</div>
            </div>
            <div className="flex justify-center gap-x-1">
              <div className="font-bold text-lg">Appointments:</div>
              <div className="">2 per day</div>
            </div>
            <div className="flex justify-center gap-x-1">
              <div className="font-bold text-lg">Picture Exercise:</div>
              <div className="">Full Access</div>
            </div>
            <div className="flex justify-center gap-x-1">
              <div className="font-bold text-lg">Video Exercise:</div>
              <div className="">Full Access</div>
            </div>
            <div className="flex justify-center gap-x-1">
              <div className="font-bold text-lg">Doctor Dashboard:</div>
              <div className="">Full Access</div>
            </div>
            <div className="flex justify-center gap-x-1">
              <div className="font-bold text-lg">Print Prescription:</div>
              <div className="">With Watermark</div>
            </div>
          </div>
        </div>
        <span></span>
      </div>
    </div>
  );
};

export default BasicCard;
