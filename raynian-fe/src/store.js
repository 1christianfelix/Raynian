import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { usersSlice } from "./slices/usersSlice";
import roomReducer from "./slices/roomSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    [usersSlice.reducerPath]: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersSlice.middleware),
  devTools: true,
});

export default store;
