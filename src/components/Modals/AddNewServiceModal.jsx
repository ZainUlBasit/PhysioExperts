import React, { useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch } from "react-redux";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { fetchServices } from "../../store/Slices/ServiceSlice"; // Assuming there's a slice for fetching services
import { RiUserForbidFill } from "react-icons/ri";
import { BiSolidImageAdd } from "react-icons/bi";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AddNewServiceApi } from "../../Api_Requests/Api_Requests"; // Assuming there's an API request for adding a service

const AddNewServiceModal = ({ Open, setOpen }) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleAddService = async () => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (selectedFile) {
        const imageRef = ref(storage, `/services/${name}`);
        const snapshot = await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      if (!imageUrl) {
        ErrorToast("Please select an image!");
        setLoading(false);
        return;
      }
      const response = await AddNewServiceApi({
        name,
        imageUrl,
      });
      if (response.data.success) {
        SuccessToast("Service added successfully!");
        dispatch(fetchServices());
        setOpen(false);
      } else {
        ErrorToast("Unable to add service");
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
          Add New Service
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="relative flex justify-center">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Service Image"
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
            <div className="flex flex-col py-4">
              <CustomInput
                Value={name}
                setValue={setName}
                Type={"text"}
                label={"Name"}
                required={true}
                placeholder={"Enter Service Name"}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-2 py-5">
          {Loading && <AddingLightLoader />}
          {!Loading && (
            <div
              className="cursor-pointer bg-[green] hover:bg-[#008000e1] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
              onClick={handleAddService}
            >
              Add
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

export default AddNewServiceModal;
