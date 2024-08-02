import React, { useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { useNavigate } from "react-router-dom";
import { UpdateDoctorApi } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch } from "react-redux";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { fetchDoctorsRequests } from "../../store/Slices/DoctorRequestSlice";
import { RiUserForbidFill } from "react-icons/ri";
import { BiSolidImageAdd } from "react-icons/bi";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditDoctorModal = ({ Open, setOpen, currentDoctor }) => {
  console.log(currentDoctor);
  const [email, setEmail] = useState(currentDoctor?.email || "");
  const [name, setName] = useState(currentDoctor?.name || "");
  const [mobile_no, setMobile_no] = useState(currentDoctor?.mobile_no || "");
  const [gender, setGender] = useState(currentDoctor?.gender || "");
  const [address, setAddress] = useState(currentDoctor?.address || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let imageUrl = currentDoctor?.imageUrl;
      if (selectedFile) {
        const imageRef = ref(storage, `/doctors/${name}`);
        const snapshot = await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      const response = await UpdateDoctorApi(currentDoctor._id, {
        name,
        email,
        mobile_no,
        imageUrl,
        gender,
        address,
      });
      if (response.data.success) {
        SuccessToast("Doctor details updated successfully!");
        dispatch(fetchDoctorsRequests());
        setOpen(false);
      } else {
        ErrorToast("Unable to update doctor details");
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex flex-col px-8 bg-aliceblue">
        <div className="py-8 text-4xl text-custom-bg border-b-custom-bg w-full text-center font-montserrat font-bold">
          Edit Doctor Details
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="relative flex justify-center">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Doctor Image"
                  className="w-24 h-24 rounded-full border-2 border-custom-bg-hover mb-6 relative"
                />
              ) : currentDoctor?.imageUrl ? (
                <img
                  src={currentDoctor.imageUrl}
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
        </div>

        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-2 py-5">
          {Loading && <AddingLightLoader />}
          {!Loading && (
            <div
              className="cursor-pointer bg-[green] hover:bg-[#008000e1] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
              onClick={handleUpdate}
            >
              Save
            </div>
          )}
          <div
            className="cursor-pointer bg-[gray] hover:bg-[#a9a9a9] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
            onClick={() => setOpen(false)}
          >
            Cancel
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditDoctorModal;
