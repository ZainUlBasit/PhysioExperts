import React, { useEffect, useState } from "react";
import SimpleBtn from "../../components/Button/SimpleBtn";
import AddNewExerciseModal from "../../components/Modals/AddNewExerciseModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../store/Slices/VideoSlice";
import AddingLightLoader from "../../components/Loaders/AddingLightLoader";
import DeleteModal from "../../components/Modals/DeleteModal";
import { DeleteExerciseApi } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import EditExerciseModal from "../../components/Modals/EditExerciseModal";

const Exercises = () => {
  const [OpenModal, setOpenModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [OpenUpdateModal, setOpenUpdateModal] = useState(false);
  const [SelectedId, setSelectedId] = useState("");

  const dispatch = useDispatch();
  const VideoState = useSelector((state) => state.VideoState);

  useEffect(() => {
    dispatch(fetchVideos(2));
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await DeleteExerciseApi(SelectedId);
      if (response.data.success) {
        SuccessToast("Exercises Deleted successfully!");
        dispatch(fetchVideos(2));
        setOpenDeleteModal(false);
      } else {
        ErrorToast("Unable to delete Exercise");
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-[95%] items-center justify-end">
        <SimpleBtn
          title={"Add New Exercise"}
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <div className="flex justify-center items-center px-3 flex-wrap gap-x-4 py-4 gap-y-4">
        {VideoState.loading ? (
          <div className="w-full flex justify-center items-center">
            <AddingLightLoader />
          </div>
        ) : (
          VideoState.data &&
          VideoState.data.map((vid) => {
            return (
              <div className="px-2 py-2 border-2 border-black flex items-center flex-col rounded-lg bg-custom-bg">
                <img
                  src={vid.sourceUrl}
                  alt="image"
                  className="w-60 h-60 rounded-lg border-2 border-custom-bg-hover relative object-cover"
                />
                <div className="text-white font-montserrat font-bold py-4">
                  {vid.title}
                </div>
                <div className="text-white text-sm mt-4 w-full flex justify-end">
                  -{vid.categoryId.name}
                </div>
                <div className="w-full flex bg-aliceblue text-aliceblue rounded-xl overflow-hidden">
                  <div
                    className="w-[50%] text-center py-2 bg-[green] hover:bg-[#008000d9] cursor-pointer transition-all ease-in-out duration-500"
                    onClick={() => {
                      setOpenUpdateModal(true);
                      setSelectedId(vid._id);
                    }}
                  >
                    Update
                  </div>
                  <div
                    className="w-[50%] text-center py-2 bg-[red] hover:bg-[#ff0000c7] cursor-pointer transition-all ease-in-out duration-500"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setSelectedId(vid._id);
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {OpenModal && (
        <AddNewExerciseModal Open={OpenModal} setOpen={setOpenModal} />
      )}
      {OpenUpdateModal && (
        <EditExerciseModal
          Open={OpenUpdateModal}
          setOpen={setOpenUpdateModal}
          exerciseData={VideoState.data.find((dt) => dt._id === SelectedId)}
        />
      )}
      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={onSubmit}
          Loading={Loading}
        />
      )}
    </div>
  );
};

export default Exercises;
