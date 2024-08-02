import React, { useRef, useState, useEffect } from "react";
// import AuthBtn from "../buttons/AuthBtn";
import { useNavigate } from "react-router-dom";
// import { VerifyOtpApi } from "../../Https";

const OTPComp = ({ email }) => {
  const [countdown, setCountdown] = useState(30); // Countdown timer
  const [timerRunning, setTimerRunning] = useState(true);

  const [otp, setOTP] = useState(["", "", "", ""]); // Initialize with empty strings
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]; // Refs for each input field
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ensure the input is a single digit
    if (/^[0-9a-zA-Z]$/.test(value) || value === "") {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Focus the next input field (if available)
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  return (
    <>
      <div className="w-fit">
        <div className="mt-8 py-6 px-7 rounded-lg flex flex-col items-center justify-center w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] font-[Quicksand]">
          <p className="mb-[10px] font-[300] text-center w-full whitespace-nowrap">
            Enter the OTP sent to {email}
          </p>

          {/* OTP Inputs */}
          <div className="flex">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                maxLength="1"
                ref={inputRefs[index]}
                className="border border-gray-300 rounded-md w-12 h-12 text-center m-2"
              />
            ))}
          </div>

          <div className="w-[200px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer my-2">
            Verify
          </div>

          {/* Footer */}
        </div>
      </div>
    </>
  );
};

export default OTPComp;
