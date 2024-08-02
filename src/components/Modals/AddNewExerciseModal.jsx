import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch, useSelector } from "react-redux";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { fetchVideos } from "../../store/Slices/VideoSlice"; // Assuming there's a slice for fetching videos
import { RiUserForbidFill } from "react-icons/ri";
import { BiSolidImageAdd } from "react-icons/bi";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import CustomPopOver from "../Inputs/CustomPopOver";
import { Popover, Typography } from "@mui/material";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import { CreateExercieseApi } from "../../Api_Requests/Api_Requests";

const AddNewExerciseModal = ({ Open, setOpen }) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [SelectedCategory, setSelectedCategory] = useState("");
  const [SelectedCategoryName, setSelectedCategoryName] = useState("");
  const CategoryState = useSelector((state) => state.CategoryState);

  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleAddVideo = async () => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (selectedFile) {
        const imageRef = ref(storage, `/videos/${name}`);
        const snapshot = await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      if (!imageUrl) {
        ErrorToast("Please select image!");
        setLoading(false);
        return;
      }
      const response = await CreateExercieseApi({
        title: name,
        sourceUrl: imageUrl,
        categoryId: SelectedCategory,
        type: 2,
      });
      if (response.data.success) {
        SuccessToast("Exercise added successfully!");
        dispatch(fetchVideos(1));
        setOpen(false);
      } else {
        ErrorToast("Unable to add Exercise");
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex flex-col px-8 bg-aliceblue">
        <div className="py-8 text-4xl text-custom-bg border-b-custom-bg w-full text-center font-montserrat font-bold">
          Add New Video
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="relative flex justify-center">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Blog Image"
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
                placeholder={"Enter Exercise Name"}
              />
              <CustomPopOver
                label={"Categories"}
                placeholder={"Select Category"}
                required={false}
                Value={SelectedCategoryName}
                onClick={handleClick}
                Width={"w-[297px]"}
              />

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    borderRadius: "25px",
                    backgroundColor: "white",
                    overflowY: "auto",
                    minWidth: "297px",
                  },
                }}
              >
                <Typography
                  sx={{
                    p: 2,
                    borderColor: "#465462",
                    backgroundColor: "#465462",
                    width: "100%",
                    borderRadius: "25px",
                    overflowY: "auto",
                    maxHeight: "60vh",
                  }}
                >
                  <div className="bg-[#465462] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
                    <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                      {CategoryState.data &&
                        CategoryState.data.map((dt) => (
                          <div
                            key={dt._id}
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              handleClose();
                              setSelectedCategoryName(dt.name);
                              setSelectedCategory(dt._id);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={SelectedCategory === dt._id}
                              readOnly
                            />
                            <span>{dt.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Typography>
              </Popover>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-2 py-5">
          {Loading && <AddingLightLoader />}
          {!Loading && (
            <div
              className="cursor-pointer bg-[green] hover:bg-[#008000e1] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
              onClick={handleAddVideo}
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

export default AddNewExerciseModal;
