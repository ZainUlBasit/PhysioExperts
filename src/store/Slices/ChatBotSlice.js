import { createSlice } from "@reduxjs/toolkit";

const ChatBotSlice = createSlice({
  name: "ChatBot",
  initialState: {
    loading: false,
    data: [
      { type: 1, msg: "Hey! I’m your AI therapist How can i help you?" },
      { type: 1, msg: "Do You need appointment or guidance" },
    ],
    isError: false,
  },
  reducers: {
    SendMessage: (state, action) => {
      if (action.payload !== "")
        state.data = [{ type: 2, msg: action.payload }, ...state.data];
    },
    RecieveMessage: (state, action) => {},
  },
});

export const { SendMessage, RecieveMessage } = ChatBotSlice.actions;

export default ChatBotSlice.reducer;
