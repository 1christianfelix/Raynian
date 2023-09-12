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

  if (isBreak) {
    dispatch(setIsBreak(false));
  }
  dispatch(setIsRunning(false));
};

export const pauseTimer = (currentCountdown) => async (dispatch, getState) => {
  console.log("pauseTimer");
  const state = getState().timer;
  dispatch(updateCountdown(currentCountdown));
  dispatch(setIsPaused(true));
  dispatch(setIsRunning(false));
};

export const timerCountdown = () => async (dispatch, getState) => {
  const state = getState().timer;
  const {
    countdown,
    workTime,
    breakTime,
    isRunning,
    isWork,
    isBreak,
    isPaused,
  } = state;

  if (!isRunning) {
    // Start the timer
    dispatch(startTimer());
  }

  // Your timer logic here...
  // You can use the state and dispatch actions to update the timer.

  // Example: Update countdown every second
  const intervalId = setInterval(() => {
    // Calculate new countdown values
    // Dispatch an action to update the timer
    // Check if it's time to switch from work to break or vice versa
    // Handle pausing and stopping the timer
  }, 1000);

  // Clear the interval when the timer is stopped or paused
  return () => clearInterval(intervalId);
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
