import { createSlice } from "@reduxjs/toolkit";
import { ChatBotQuestions } from "../../utils/ChatBotQuestions";

const ChatBotSlice = createSlice({
  name: "ChatBot",
  initialState: {
    loading: false,
    data: [],
    isError: false,
    currentQuestionIndex: 0,
  },
  reducers: {
    SendMessage: (state, action) => {
      if (action.payload !== "")
        state.data = [{ type: 2, msg: action.payload }, ...state.data];
    },
    RecieveMessage: (state, action) => {
      const currentQuestion = ChatBotQuestions[state.currentQuestionIndex];
      if (currentQuestion) {
        state.data = [
          {
            type: 1,
            msg: currentQuestion.question,
            options: currentQuestion.options,
          },
          ...state.data,
        ];
        state.currentQuestionIndex++;
      } else {
        state.data = [
          {
            type: 1,
            msg: "Thank you for your responses. Please consult a specialist if necessary.",
          },
          ...state.data,
        ];
      }
    },
  },
});

export const { SendMessage, RecieveMessage } = ChatBotSlice.actions;

export default ChatBotSlice.reducer;
