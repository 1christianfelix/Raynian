import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  countdown: {
    hours: 0,
    minutes: 60,
    seconds: 0,
  },
  workTime: {
    hours: 0,
    minutes: 60,
    seconds: 0,
  },
  breakTime: {
    hours: 0,
    minutes: 15,
    seconds: 0,
  },
  isRunning: false,
  isWork: true,
  isBreak: false,
  isPaused: false,
  syncedWithRoom: false,
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
    decrementCountdown: (state) => {
      const { hours, minutes, seconds } = state.countdown;
      if (hours <= 0 && minutes === 0 && seconds === 0) {
        if (state.isWork == true) {
          state.isBreak = true;
          state.isWork = false;
          state.countdown = state.breakTime;
          return;
        } else {
          state.isBreak = false;
          state.isWork = true;
          state.countdown = state.workTime;
          state.isRunning = false;
          return;
        }
      }

      if (minutes === 0 && seconds === 0) {
        state.countdown = {
          hours: hours - 1,
          minutes: 59,
          seconds: 59,
        };
      } else if (seconds === 0) {
        state.countdown = {
          hours,
          minutes: minutes - 1,
          seconds: 59,
        };
      } else {
        state.countdown = {
          hours,
          minutes,
          seconds: seconds - 1,
        };
      }
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
  updateCountdown({ ...workTime });
  if (isBreak) {
    dispatch(setIsBreak(false));
    dispatch(setIsWork(true));
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
  decrementCountdown,
} = timerSlice.actions;
export default timerSlice.reducer;
