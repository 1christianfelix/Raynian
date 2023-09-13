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

    setIsWork: (state, action) => {
      state.isWork = action.payload;
    },
    setIsBreak: (state, action) => {
      state.isBreak = action.payload;
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    setIsPaused: (state, action) => {
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

export const startTimer = () => async (dispatch, getState) => {
  const state = getState().timer;
  console.log("startTimer");
  const { isRunning } = state;
  if (!isRunning) {
    dispatch(setIsRunning(true));
    dispatch(setIsPaused(false));
  }
};

export const stopTimer = () => async (dispatch, getState) => {
  console.log("stopTimer");
  const state = getState().timer;
  const { isWork, isBreak, workTime, breakTime } = state;
  updateCountdown({
    hours: 0,
    minutes: workTime,
    seconds: 0,
  });
  if (isBreak) {
    dispatch(setIsBreak(false));
  }
  dispatch(setIsRunning(false));
  dispatch(setIsPaused(false));
};

export const pauseTimer = (currentCountdown) => async (dispatch, getState) => {
  console.log("pauseTimer");
  const state = getState().timer;
  dispatch(updateCountdown(currentCountdown));
  dispatch(setIsPaused(true));
  dispatch(setIsRunning(false));
};

export const getTimerState = () => async (dispatch, getState) => {
  const state = getState().timer;
  return state;
};

export const {
  updateCountdown,
  setIsWork,
  setIsBreak,
  setIsRunning,
  setIsPaused,
  setWorkTime,
  setBreakTime,
} = timerSlice.actions;
export default timerSlice.reducer;
