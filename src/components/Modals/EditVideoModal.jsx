import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch, useSelector } from "react-redux";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { fetchVideos } from "../../store/Slices/VideoSlice";
import { RiUserForbidFill } from "react-icons/ri";
import { BiSolidImageAdd } from "react-icons/bi";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import CustomPopOver from "../Inputs/CustomPopOver";
import { Popover, Typography } from "@mui/material";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import { UpdateExerciseApi } from "../../Api_Requests/Api_Requests";

const EditVideoModal = ({ Open, setOpen, videoData }) => {
  console.log(videoData);
  const [name, setName] = useState(videoData.title || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [SelectedCategory, setSelectedCategory] = useState(
    videoData.categoryId._id || ""
  );
  const [SelectedCategoryName, setSelectedCategoryName] = useState(
    videoData.categoryId.name || ""
  );
  const CategoryState = useSelector((state) => state.CategoryState);
  const [existingVideoUrl, setExistingVideoUrl] = useState(
    videoData.sourceUrl || ""
  );
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [videoData, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpdateVideo = async () => {
    setLoading(true);
    try {
      let videoUrl = existingVideoUrl;
      if (selectedFile) {
        const videoRef = ref(storage, `/videos/${name}`);
        const snapshot = await uploadBytes(videoRef, selectedFile);
        videoUrl = await getDownloadURL(snapshot.ref);
      }
      if (!videoUrl) {
        ErrorToast("Please select video!");
        setLoading(false);
        return;
      }
      const response = await UpdateExerciseApi(videoData._id, {
        title: name,
        sourceUrl: videoUrl,
        categoryId: SelectedCategory,
        type: 1,
      });
      if (response.data.success) {
        SuccessToast("Video updated successfully!");
        dispatch(fetchVideos(1));
        setOpen(false);
      } else {
        ErrorToast("Unable to update video");
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

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex flex-col px-8 bg-aliceblue">
        <div className="py-8 text-4xl text-custom-bg border-b-custom-bg w-full text-center font-montserrat font-bold">
          Edit Video
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="relative flex justify-center">
              {selectedFile ? (
                <video
                  src={URL.createObjectURL(selectedFile)}
                  alt="Video"
                  className="w-60 h-60 rounded-lg border-2 border-custom-bg-hover mb-6 relative object-cover"
                  controls
                />
              ) : existingVideoUrl ? (
                <video
                  src={existingVideoUrl}
                  alt="Video"
                  className="w-60 h-60 rounded-lg border-2 border-custom-bg-hover mb-6 relative object-cover"
                  controls
                />
              ) : (
                <RiUserForbidFill className="w-60 h-60 rounded-lg mb-4 text-custom-bg-hover" />
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
              accept=".mp4, .mkv, .avi"
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
                placeholder={"Enter Video Name"}
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
              onClick={handleUpdateVideo}
            >
              Update
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

export default EditVideoModal;
