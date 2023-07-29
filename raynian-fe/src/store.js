import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { usersSlice } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersSlice.reducerPath]: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersSlice.middleware),
  devTools: true,
});

export default store;
