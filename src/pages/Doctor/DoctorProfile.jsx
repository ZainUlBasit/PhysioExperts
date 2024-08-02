import React, { useEffect, useState } from "react";
import DoctorNavbar from "../../components/Navbar/DoctorNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../store/Slices/DoctorSlice";
import Navbar from "../../components/Navbar/Navbar";
import CustomInput from "../../components/Inputs/CustomInput";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { UpdateDoctorApi } from "../../Api_Requests/Api_Requests";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BiSolidImageAdd } from "react-icons/bi";
import { RiUserForbidFill } from "react-icons/ri";
import WeekDaysList from "../../components/Inputs/WeekDaysList";

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const DoctorState = useSelector((state) => state.DoctorState);
  const AuthState = useSelector((state) => state.AuthState);
  const [weekDays, setWeekDays] = useState([
    { day: "Sunday", available: false, from: "10:00", to: "16:00" },
    { day: "Monday", available: false, from: "10:00", to: "16:00" },
    { day: "Tuesday", available: false, from: "10:00", to: "16:00" },
    { day: "Wednesday", available: false, from: "10:00", to: "16:00" },
    { day: "Thursday", available: false, from: "10:00", to: "16:00" },
    { day: "Friday", available: false, from: "10:00", to: "16:00" },
    { day: "Saturday", available: false, from: "10:00", to: "16:00" },
  ]);
  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);
  useEffect(() => {
    const tempUser = DoctorState.data.find(
      (dt) => dt._id === AuthState.data.doctorId._id
    );
    console.log(tempUser);
    if (tempUser) {
      setName(tempUser.name);
      setEmail(tempUser.email);
      setMobile_no(tempUser.mobile_no);
      setAddress(tempUser.address);
      setGender(tempUser.gender);
      setImageUrl(tempUser.imageUrl);
      setWeekDays(tempUser.clinic_timing);
    }
  }, [DoctorState.data]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !mobile_no ||
      selectedFile === undefined ||
      !address ||
      !gender
    ) {
      return ErrorToast("Required field are undefined!");
    } else {
      try {
        let downloadURL = imageUrl;
        if (selectedFile) {
          const imageRef = ref(storage, `/doctors/${name}`);
          const snapshot = await uploadBytes(imageRef, selectedFile);
          downloadURL = await getDownloadURL(snapshot.ref);
        }
        const response = await UpdateDoctorApi(AuthState.data.doctorId._id, {
          name,
          email,
          password,
          mobile_no,
          imageUrl: downloadURL,
          gender,
          address,
          clinic_timing: weekDays,
        });
        if (response.data.success) {
          SuccessToast("Doctor details updated successfully!");
          navigate("/doctor");
        } else {
          ErrorToast("Unable to update doctor details");
        }
      } catch (err) {
        console.log(err);
        ErrorToast(err?.response?.data?.error?.msg || err.message);
      }
    }
  };

  return (
    <div className="bg-aliceblue min-h-screen">
      <DoctorNavbar />
      <div className="flex flex-col w-full flex-1 justify-center items-center bg-aliceblue my-8">
        {/* <Navbar /> */}
        <div className="w-fit flex flex-col items-center pt-3 rounded-[40px] bg-aliceblue pb-8 px-8">
          {/* <img src="/logo.png" alt="logo" className="w-[150px]" /> */}
          <div className="text-custom-bg font-montserrat font-bold text-2xl pb-6 w-[400px] text-center">
            Update Doctor Details
          </div>
          <div className="flex flex-col gap-y-3 pb-4">
            <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center">
              <div className="flex flex-col">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
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
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
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
              <div className="flex flex-col items-center font-montserrat">
                <div className="font-bold text-2xl py-5">Schedule</div>
                <WeekDaysList weekDays={weekDays} setWeekDays={setWeekDays} />
                {/* <CustomInput
                  Value={password}
                  setValue={setPassword}
                  Type={"password"}
                  label={"Password"}
                  required={true}
                  placeholder={"******************"}
                /> */}
              </div>
            </div>
          </div>
          <div
            className="w-[250px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer"
            onClick={handleSubmit}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
