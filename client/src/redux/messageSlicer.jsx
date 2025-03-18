import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [], // Store messages of the selected chat
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload; // Set the messages when a chat is selected
    },
    updateMessageReadStatus: (state, action) => {
      const { messageId, status } = action.payload;
      const message = state.messages.find((msg) => msg._id === messageId);
      if (message) {
        message.read = status; // Update read status of the message
      }
    },
    resetMessages: (state) => {
      state.messages = []; // Clear messages when switching chats
    },
  },
});

export const { setMessages, updateMessageReadStatus, resetMessages } =
  messageSlice.actions;

export default messageSlice.reducer;
