import { Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { RecieveMessage, SendMessage } from "../../store/Slices/ChatBotSlice";

const VisitorLayout = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const ChatBotState = useSelector((state) => state.ChatBotState);
  const dispatch = useDispatch();
  const [Msg, setMsg] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(SendMessage(Msg));
      setMsg("");
    }
  };

  return (
    <div className="relative">
      <Outlet />
      <div
        className="absolute bottom-10 right-10 text-5xl p-4 rounded-full bg-custom-bg hover:bg-custom-bg-hover border-2 border-custom-bg text-aliceblue transition-all ease-in-out duration-500 cursor-pointer"
        onClick={handleClick}
      >
        <img src="/chatbot.png" alt="" className="w-[70px]" />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            borderBottomRightRadius: "0px",

            backgroundColor: "white",
            overflowY: "auto",
            marginRight: "10px",
            borderWidth: "4px",
            borderColor: "#465462",
          },
        }}
      >
        <Typography
          sx={{
            p: 2,
            paddingRight: 0,
            paddingLeft: 0,
            borderColor: "#465462",
            backgroundColor: "#465462",
            width: "200px",
            borderRadius: "5px",
            borderBottomRightRadius: "0px",
            overflowY: "auto",
            maxHeight: "60vh",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            minWidth: "300px",
          }}
        >
          <div className="h-[10%] w-full text-center text-white font-bold font-montserrat">
            Chat
          </div>
          <div className="h-[67%] overflow-y-auto bg-aliceblue px-2 flex flex-col-reverse items-end">
            {ChatBotState.data &&
              ChatBotState.data.map(({ _id, type, msg }) => {
                return (
                  <div
                    key={_id}
                    className={`px-1 py-1 w-full font-montserrat text-white font-semibold text-xs ${
                      type === 1
                        ? "flex justify-start items-center"
                        : type === 2 && "flex justify-end items-center"
                    }`}
                  >
                    <div
                      className={`w-fit px-4 py-3 ${
                        type === 1
                          ? "bg-custom-bg-hover rounded-t-md rounded-br-md"
                          : type === 2 &&
                            "bg-custom-bg rounded-t-md rounded-bl-md"
                      }`}
                    >
                      {msg}
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            className="h-[28%] px-3 pb-1 flex flex-col items-end py-2 gap-y-2"
            onKeyDown={handleKeyDown}
          >
            <input
              type="text"
              className="w-full outline-none px-2 py-3 rounded-lg text-sm"
              placeholder="Enter Your Message"
              value={Msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <div
              className="text-aliceblue bg-custom-bg-hover hover:bg-aliceblue hover:text-custom-bg rounded-lg p-2 px-3 cursor-pointer transition-all ease-in-out duration-700 border-2 border-custom-bg-hover"
              onClick={() => {
                dispatch(SendMessage(Msg));
                dispatch(RecieveMessage(Msg));
                setMsg("");
              }}
            >
              Send
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  );
};

export default VisitorLayout;
