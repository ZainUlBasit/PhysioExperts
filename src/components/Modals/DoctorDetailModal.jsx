import React, { useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { useNavigate } from "react-router-dom";
import {
  ApproveDoctorRequestsApi,
  RejectDoctorRequestsApi,
} from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch } from "react-redux";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { fetchDoctorsRequests } from "../../store/Slices/DoctorRequestSlice";
import { RiUserForbidFill } from "react-icons/ri";

const DoctorDetailModal = ({ Open, setOpen, currentDoctor }) => {
  const [email, setEmail] = useState(currentDoctor?.email || "");
  const [name, setName] = useState(currentDoctor.name || "");
  const [mobile_no, setMobile_no] = useState(currentDoctor.mobile_no || "");
  const [gender, setGender] = useState(currentDoctor.gender || "");
  const [address, setAddress] = useState(currentDoctor.address || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex flex-col px-8 bg-aliceblue">
        <div className=" py-8 text-4xl text-custom-bg border-b-custom-bg w-full text-center font-montserrat font-bold">
          Doctor Details
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="relative flex justify-center">
              {currentDoctor?.imageUrl ? (
                <img
                  src={currentDoctor.imageUrl}
                  alt="Doctor Image"
                  className="w-24 h-24 rounded-full border-2 border-custom-bg-hover mb-6 relative"
                />
              ) : (
                <RiUserForbidFill className="w-24 h-24 rounded-full mb-4 text-custom-bg-hover" />
              )}
            </div>
            <CustomInput
              Value={name}
              setValue={setName}
              Type={"text"}
              label={"Name"}
              required={true}
              placeholder={"Enter Name"}
              disabled={true}
            />
            <CustomInput
              Value={email}
              setValue={setEmail}
              Type={"email"}
              label={"Email"}
              required={true}
              placeholder={"Enter Email"}
              disabled={true}
            />
            <CustomInput
              Value={mobile_no}
              setValue={setMobile_no}
              Type={"text"}
              label={"Mobile No"}
              required={true}
              placeholder={"Enter Mobile No"}
              disabled={true}
            />
            <CustomInput
              Value={address}
              setValue={setAddress}
              Type={"text"}
              label={"Address"}
              required={true}
              placeholder={"Enter Address"}
              disabled={true}
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
                  const response = await ApproveDoctorRequestsApi(
                    currentDoctor._id
                  );
                  if (response?.data?.success) {
                    SuccessToast(response.data.data.msg);
                    dispatch(fetchDoctorsRequests());
                    setOpen(false);
                  }
                } catch (err) {
                  ErrorToast(err.response?.data?.error?.msg || err.message);
                }
                setLoading(false);
              }}
            >
              Approved
            </div>
          )}
          {!Loading && (
            <div
              className="cursor-pointer bg-[red] hover:bg-[#ff0000e5] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
              onClick={async () => {
                setLoading(true);
                try {
                  const response = await RejectDoctorRequestsApi(
                    currentDoctor._id
                  );
                  if (response?.data?.success) {
                    SuccessToast(response.data.data.msg);
                    dispatch(fetchDoctorsRequests());
                    setOpen(false);
                  }
                } catch (err) {
                  ErrorToast(err.response?.data?.error?.msg || err.message);
                }
                setLoading(false);
              }}
            >
              Reject
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default DoctorDetailModal;
