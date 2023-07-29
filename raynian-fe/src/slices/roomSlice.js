import { createSlice } from "@reduxjs/toolkit";
import { joinRoom } from "../components/socket/socketConnection";

const initialState = {
  roomID: null,
  chatLog: [],
  participants: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    // Connect to room
    connectToRoom: (state, action) => {
      state.roomID = action.payload;
      joinRoom({ room: state.roomID });
    },
    // Reducer for updating the chat log
    updateChatLog: (state, action) => {
      // The payload should be an object containing the message details (e.g., { id, sender, text, timestamp })
      state.chatLog = action.payload;
    },

    // Reducer for updating the participants
    updateParticipants: (state, action) => {
      // The payload should be an array of participant names
      state.participants = action.payload;
    },
  },
});

export const { connectToRoom, updateChatLog, updateParticipants } =
  roomSlice.actions;
export default roomSlice.reducer;
