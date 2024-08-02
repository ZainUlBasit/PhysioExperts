import React, { useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch } from "react-redux";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { UpdateCategoryApi } from "../../Api_Requests/Api_Requests"; // Assuming there's an API request for editing category
import { fetchCategories } from "../../store/Slices/CategorySlice";

const EditCategoryModal = ({ Open, setOpen, category }) => {
  const [name, setName] = useState(category.name || "");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleEditCategory = async () => {
    setLoading(true);
    try {
      const response = await UpdateCategoryApi(category._id, { name });
      if (response.data.success) {
        SuccessToast("Category updated successfully!");
        dispatch(fetchCategories());
        setOpen(false);
      } else {
        ErrorToast("Unable to update category");
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
          Edit Category
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col py-4">
            <CustomInput
              Value={name}
              setValue={setName}
              Type={"text"}
              label={"Name"}
              required={true}
              placeholder={"Enter Category Name"}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-2 py-5">
          {Loading && <AddingLightLoader />}
          {!Loading && (
            <div
              className="cursor-pointer bg-[green] hover:bg-[#008000e1] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
              onClick={handleEditCategory}
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

export default EditCategoryModal;
