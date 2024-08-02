import React from "react";
import { FaSearch } from "react-icons/fa";

const TableHeader = ({ placeholder, value, setValue, title }) => {
  return (
    <div className="w-full flex justify-between text-center bg-custom-bg text-aliceblue font-montserrat text-xl font-bold py-4 rounded-t-[10px] px-4 items-center flex-wrap gap-y-2">
      <div className="text-2xl">{title}</div>
      {title !== "History" && (
        <div className="bg-aliceblue text-custom-bg flex items-center gap-x-2 rounded-full px-4 overflow-hidden">
          <FaSearch />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="text-[1rem] py-2 px-2 outline-none bg-aliceblue"
          />
        </div>
      )}
    </div>
  );
};

export default TableHeader;
