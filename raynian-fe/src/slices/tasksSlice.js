import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  host: {},
  roomId: null,
  chat: [],
  participants: [],
  roomSettings: {},
  public: true,
};
