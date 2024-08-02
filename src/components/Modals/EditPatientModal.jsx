import React, { useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { useNavigate } from "react-router-dom";
import { UpdatePatientAPI } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch } from "react-redux";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { fetchPatients } from "../../store/Slices/PatientSlice";
import { BiSolidImageAdd } from "react-icons/bi";
import { RiUserForbidFill } from "react-icons/ri";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditPatientModal = ({ Open, setOpen, currentPatient }) => {
  //   const [email, setEmail] = useState(currentPatient?.email || "");
  const [name, setName] = useState(currentPatient?.name || "");
  const [mobile_no, setMobile_no] = useState(currentPatient?.mobile_no || "");
  const [gender, setGender] = useState(currentPatient?.gender || "");
  const [address, setAddress] = useState(currentPatient?.address || "");
  const [age, setAge] = useState(currentPatient?.age || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex flex-col px-8 bg-aliceblue">
        <div className="py-8 text-4xl text-custom-bg border-b-custom-bg w-full text-center font-montserrat font-bold">
          Patient Details
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="relative flex justify-center">
              {currentPatient?.imageUrl || selectedFile ? (
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : currentPatient.imageUrl
                  }
                  alt="Patient Image"
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
            <CustomInput
              Value={name}
              setValue={setName}
              Type={"text"}
              label={"Name"}
              required={true}
              placeholder={"Enter Name"}
            />
            {/* <CustomInput
              Value={email}
              setValue={setEmail}
              Type={"email"}
              label={"Email"}
              required={true}
              placeholder={"Enter Email"}
            /> */}
            <CustomInput
              Value={mobile_no}
              setValue={setMobile_no}
              Type={"text"}
              label={"Mobile No"}
              required={true}
              placeholder={"Enter Mobile No"}
            />
            <CustomInput
              Value={age}
              setValue={setAge}
              Type={"number"}
              label={"Age"}
              required={true}
              placeholder={"Enter Age"}
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
        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-2 py-5">
          {Loading && <AddingLightLoader />}
          {!Loading && (
            <div
              className="cursor-pointer bg-[green] hover:bg-[#008000e1] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
              onClick={async () => {
                setLoading(true);
                try {
                  let imageUrl = currentPatient.imageUrl;
                  if (selectedFile) {
                    const imageRef = ref(storage, `/patients/${name}`);
                    const snapshot = await uploadBytes(imageRef, selectedFile);
                    imageUrl = await getDownloadURL(snapshot.ref);
                  }
                  const response = await UpdatePatientAPI(currentPatient._id, {
                    name,
                    // email,
                    mobile_no,
                    imageUrl,
                    gender,
                    address,
                    age,
                  });
                  if (response?.data?.success) {
                    SuccessToast(response.data.data.msg);
                    dispatch(fetchPatients());
                    setOpen(false);
                  }
                } catch (err) {
                  ErrorToast(err.response?.data?.error?.msg || err.message);
                }
                setLoading(false);
              }}
            >
              Save
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default EditPatientModal;
