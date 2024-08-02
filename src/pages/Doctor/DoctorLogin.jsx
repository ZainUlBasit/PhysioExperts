import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CustomInput from "../../components/Inputs/CustomInput";
import OTPComp from "../../components/OTPComp/OTPComp";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/ValidateEmail";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { LoginUserApi } from "../../Api_Requests/Api_Requests";
import AddingLightLoader from "../../components/Loaders/AddingLightLoader";
import { motion } from "framer-motion";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

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

  const onSubmit = async (e) => {
    setLoading(true);
    if (!validateEmail(email)) {
      ErrorToast("Invalid Email!");
    } else if (!password) {
      ErrorToast("Password Field Required!");
    }
    try {
      const response = await LoginUserApi({ email, password, role: 2 });
      if (response?.data?.success) {
        localStorage.setItem(
          "user-data",
          JSON.stringify(response.data.data.payload.user)
        );
        localStorage.setItem("token", response.data.data.payload.token);
        localStorage.setItem("logged-in", true);
        SuccessToast(response.data.data.msg);
        window.location.reload();
      }
    } catch (err) {
      //   console.log(err);
      ErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
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
        className="w-fit flex flex-col items-center border-2 border-custom-bg pt-3 rounded-[30px] bg-aliceblue pb-8"
      >
        <img src="/logo.png" alt="logo" className="w-[200px]" />
        <div className="text-custom-bg font-montserrat font-bold text-3xl pb-6 w-[400px] text-center ">
          Login is an Doctor
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
        {Loading ? (
          <div className="my-4">
            <AddingLightLoader />
          </div>
        ) : (
          <div
            className="w-[250px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer"
            onClick={onSubmit}
          >
            Sign In
          </div>
        )}
        <div className="text font-montserrat flex gap-x-1 my-5 mb-2">
          Don't have an account!{" "}
          <div
            className="text-custom-bg hover:text-custom-bg-hover font-bold cursor-pointer transition-all ease-in-out duration-500"
            onClick={() => navigate("/doctor/registration")}
          >
            Sign Up!
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DoctorLogin;
