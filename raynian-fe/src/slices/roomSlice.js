import { createSlice } from "@reduxjs/toolkit";
import { joinRoom } from "../components/socket/socketConnection";

const initialState = {
  userInfo: "",
  roomID: null,
  chatLog: [],
  participants: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    // set user
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    // Connect to room
    connectToRoom: (state, action) => {
      state.roomID = action.payload;
      joinRoom({
        room: state.roomID,
        user: state.userInfo,
        participants: state.participants,
      });
    },
    // Reducer for updating the chat log
    updateChatLog: (state, action) => {
      // The payload should be an object containing the message details (e.g., { id, sender, text, timestamp })
      state.chatLog = action.payload;
    },

    // Reducer for updating the participants
    updateParticipants: (state, action) => {
      // The payload should be an array of participant names
      state.participants = [...state.participants, action.payload];
    },
  },
});

export const { connectToRoom, updateChatLog, updateParticipants, setUserInfo } =
  roomSlice.actions;
export default roomSlice.reducer;
