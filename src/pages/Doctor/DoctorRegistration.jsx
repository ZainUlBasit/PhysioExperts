import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CustomInput from "../../components/Inputs/CustomInput";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { RegisterUserApi } from "../../Api_Requests/Api_Requests";
import { BiSolidImageAdd } from "react-icons/bi";
import { RiUserForbidFill } from "react-icons/ri";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const DoctorRegistration = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-white my-8">
      {/* <Navbar /> */}
      <div className="w-fit flex flex-col items-center border-2 border-custom-bg pt-3 rounded-[40px] bg-aliceblue pb-8 px-8">
        <img src="/logo.png" alt="logo" className="w-[150px]" />
        <div className="text-custom-bg font-montserrat font-bold text-2xl pb-6 w-[400px] text-center">
          Sign Up as a Doctor
        </div>
        <div className="flex flex-col gap-y-3 pb-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Doctor Image"
                  className="w-24 h-24 rounded-full border-2 border-custom-bg-hover mb-6 relative"
                />
              ) : (
                <RiUserForbidFill className="w-24 h-24 rounded-full mb-4 text-custom-bg-hover" />
              )}
              <label
                htmlFor="file-input"
                className="absolute bottom-0 right-0 cursor-pointer flex items-center w-fit p-1 rounded-full border-1 border-black text-custom-bg bg-black hover:bg-gray-800 transition-all ease-in-out duration-500"
              >
                <BiSolidImageAdd className="text-[1.1rem]" />
              </label>
            </div>
            <input
              id="file-input"
              type="file"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
            <div className="flex flex-col">
              <CustomInput
                Value={name}
                setValue={setName}
                Type={"text"}
                label={"Name"}
                required={true}
                placeholder={"Enter Name"}
              />
              <CustomInput
                Value={email}
                setValue={setEmail}
                Type={"email"}
                label={"Email"}
                required={true}
                placeholder={"Enter Email"}
              />
              <CustomInput
                Value={mobile_no}
                setValue={setMobile_no}
                Type={"text"}
                label={"Mobile No"}
                required={true}
                placeholder={"Enter Mobile No"}
              />
            </div>
            <div className="flex flex-col">
              <CustomInput
                Value={password}
                setValue={setPassword}
                Type={"password"}
                label={"Password"}
                required={true}
                placeholder={"******************"}
              />
              <CustomInput
                Value={address}
                setValue={setAddress}
                Type={"text"}
                label={"Address"}
                required={true}
                placeholder={"Enter Address"}
              />
              <div className="flex gap-x-2 items-center justify-center font-montserrat">
                <label className="font-montserrat font-medium text-lg">
                  Gender:
                </label>
                <div className="flex gap-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-[250px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer"
          onClick={async () => {
            // Handle the sign-up logic here
            if (
              !name ||
              !email ||
              !password ||
              !mobile_no ||
              selectedFile === undefined ||
              !address ||
              !gender
            ) {
              return ErrorToast("Required field are undefined!");
            } else {
              try {
                const imageRef = ref(storage, `/doctors/${name}`);
                const snapshot = await uploadBytes(imageRef, selectedFile);
                const downloadURL = await getDownloadURL(snapshot.ref);
                const response = await RegisterUserApi({
                  name,
                  email,
                  password,
                  mobile_no,
                  imageUrl: downloadURL,
                  gender,
                  address,
                  role: 2,
                });
                if (response.data.success) {
                  SuccessToast(
                    "Doctor Successfully Registered! - Wait for Varification"
                  );
                  navigate("/doctor");
                } else {
                  ErrorToast("Unable to registere as a doctor");
                }
              } catch (err) {
                console.log(err);
                ErrorToast(err.response.data.error.msg || err.message);
              }
            }
          }}
        >
          Sign Up
        </div>
        <div className="text font-montserrat flex gap-x-1 my-5 mb-2">
          Already have an account?{" "}
          <div
            className="text-custom-bg hover:text-custom-bg-hover font-bold cursor-pointer transition-all ease-in-out duration-500"
            onClick={() => navigate("/doctor")}
          >
            Sign In!
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
