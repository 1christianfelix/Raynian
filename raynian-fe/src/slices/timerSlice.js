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

  if (isWork) {
    dispatch(
      updateCountdown({
        hours: 0,
        minutes: workTime,
        seconds: 0,
      })
    );
  }
  if (isBreak) {
    dispatch(
      updateCountdown({
        hours: 0,
        minutes: breakTime,
        seconds: 0,
      })
    );
  }
  dispatch(setIsRunning(false));
};

export const pauseTimer = () => async (dispatch, getState) => {
  console.log("pauseTimer");
  const state = getState().timer;
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
  switchTimers,
  setIsRunning,
  setIsPaused,
  setWorkTime,
  setBreakTime,
} = timerSlice.actions;
export default timerSlice.reducer;
