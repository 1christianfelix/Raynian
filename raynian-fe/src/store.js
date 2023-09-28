import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { usersSlice } from "./slices/usersSlice";
import roomReducer from "./slices/roomSlice";
import timerReducer from "./slices/timerSlice";
import { statsApi } from "./slices/statsApi";
import tasksSlice from "./slices/tasksSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    timer: timerReducer,
    tasks: tasksSlice,
    [usersSlice.reducerPath]: usersSlice.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersSlice.middleware)
      .concat(statsApi.middleware),
  devTools: true,
});

export default store;
