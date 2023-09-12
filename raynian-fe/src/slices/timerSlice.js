import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  countdown: {
    hours: 0,
    minutes: 60,
    seconds: 0,
  },
  workTime: 60,
  breakTime: 15,
  isRunning: false,
  isWork: true,
  isBreak: false,
  isPaused: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateCountdown: (state, action) => {
      state.countdown = action.payload;
    },
    switchTimers: (state) => {
      state.isBreak = !state.isBreak;
      state.isWork = !state.isWork;
    },
    toggleIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    toggleIsPaused: (state, action) => {
      state.isPaused = action.payload;
    },
    setWorkTime: (state, action) => {
      state.workTime = action.payload;
    },
    setBreakTime: (state, action) => {
      state.breakTime = action.payload;
    },
  },
});

export const {
  updateCountdown,
  switchTimers,
  toggleIsRunning,
  toggleIsPaused,
  setWorkTime,
  setBreakTime,
} = timerSlice.actions;
export default timerSlice.reducer;
