import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  name: "tasks",
  items: [{ id: "1", content: "Hello! What do you have to do this session?" }],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Connect to room
    addItem: (state, action) => {
      const newArr = state.items;
      newArr.push(action.payload);
      state.items = newArr;
    },
    removeItem: (state, action) => {
      const newArr = state.items;
      newArr.splice(action.payload, 1);
      state.items = newArr;
    },
  },
});

export const { addItem, removeItem } = tasksSlice.actions;
export default tasksSlice.reducer;
