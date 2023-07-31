import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  roomID: null,
  chat: [],
  participants: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    // set user
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    // Connect to room
    connectToRoom: (state, action) => {
      state.roomID = action.payload;
    },
    // Reducer for updating the chat log
    updateChat: (state, action) => {
      state.chat = [...state.chat, action.payload];
    },

    // Reducer for updating the participants
    updateParticipants: (state, action) => {
      // The payload should be an array of participant names
      state.participants = action.payload;
    },
  },
});

export const { connectToRoom, updateChat, updateParticipants, setUserInfo } =
  roomSlice.actions;
export default roomSlice.reducer;
