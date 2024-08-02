import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CustomInput from "../../components/Inputs/CustomInput";
import OTPComp from "../../components/OTPComp/OTPComp";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast, WarningToast } from "../../utils/ShowToast";
import {
  LoginUserApi,
  VerifyAdminOtpApi,
} from "../../Api_Requests/Api_Requests";
import { validateEmail } from "../../utils/ValidateEmail";
import AddingLightLoader from "../../components/Loaders/AddingLightLoader";
import { SetAuth } from "../../store/Slices/AuthSlice";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [AccountId, setAccountId] = useState("");
  const [OtpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();
  const [LoginLoading, setLoginLoading] = useState(false);
  const [OtpSend, setOtpSend] = useState(false);
  const [OTPLoading, setOTPLoading] = useState(false);

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

  //   navigate("/admin/dashboard");

  const onSubmit = async (e) => {
    setLoginLoading(true);
    if (!validateEmail(email)) {
      ErrorToast("Invalid Email!");
    } else if (!password) {
      ErrorToast("Password Field Required!");
    }
    try {
      const response = await LoginUserApi({ email, password, role: 1 });
      setAccountId(response.data.data.payload._id);
      setOtpSend(response.data.success);
      SuccessToast("Check your email for otp verification!");
    } catch (err) {
      console.log(err);
      ErrorToast(err?.response?.data?.error?.msg || err.message);
    }
    setLoginLoading(false);
  };

  const verifyOtp = async (e) => {
    setOTPLoading(true);
    const fullOtp = otp[0] + otp[1] + otp[2] + otp[3];
    if (fullOtp.length < 4) {
      WarningToast("Invalid Otp!");
    } else {
      try {
        const response = await VerifyAdminOtpApi({
          accountId: AccountId,
          otp: fullOtp,
        });
        if (response.data.success) {
          localStorage.setItem(
            "user-data",
            JSON.stringify(response.data.data.payload.user)
          );
          localStorage.setItem("token", response.data.data.payload.token);
          localStorage.setItem("logged-in", true);

          console.log(response.data.data.payload.user);
          SuccessToast(response.data.data.msg);
          window.location.reload();
          //   navigate("/admin/dashboard");
        }
      } catch (err) {
        ErrorToast(err?.response?.data?.error?.msg || err.message);
      }
      setOTPLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        delayChildren: 0.3,
        staggerChildren: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const LoginBox = {
    hidden: { y: -900, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full h-screen justify-center items-center bg-white"
    >
      {/* <Navbar /> */}
      <motion.div
        variants={LoginBox}
        className="w-fit flex flex-col items-center border-2 border-custom-bg pt-3 rounded-[30px] bg-aliceblue"
      >
        <img src="/logo.png" alt="logo" className="w-[200px]" />
        <div className="text-custom-bg font-montserrat font-bold text-3xl pb-6 w-[400px] text-center ">
          Login is an Admin
        </div>
        <div className="flex flex-col gap-y-3 pb-4">
          <CustomInput
            Value={email}
            setValue={setEmail}
            Type={"email"}
            label={"Email"}
            required={true}
            placeholder={"Enter Email"}
          />
          <CustomInput
            Value={password}
            setValue={setPassword}
            Type={"password"}
            label={"Password"}
            required={true}
            placeholder={"******************"}
          />
        </div>
        {LoginLoading ? (
          <div className="my-4">
            <AddingLightLoader />
          </div>
        ) : (
          <div
            className="w-[250px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer mb-4"
            onClick={onSubmit}
          >
            Sign In
          </div>
        )}
        <div className={`max-w-[300px] ${!OtpSend && "hidden"}`}>
          <div className="pb-4 px-7 rounded-lg flex flex-col items-center justify-center w-full  font-[Quicksand]">
            <p className="mb-[10px] font-[400] text-center w-full font-montserrat text-custom-bg">
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
            {OTPLoading ? (
              <div className="my-4">
                <AddingLightLoader />
              </div>
            ) : (
              <div
                className="w-[200px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer my-2"
                onClick={verifyOtp}
              >
                Verify
              </div>
            )}

            {/* Footer */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;
