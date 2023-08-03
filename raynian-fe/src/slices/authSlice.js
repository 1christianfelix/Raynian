import { createSlice } from "@reduxjs/toolkit";
import { generateUniqueUserNoCheck } from "../helpers/generateUser";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      console.log(user);
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify({ user }));
    },
    removeCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    generateGuestCredentials: (state) => {
      const username = generateUniqueUserNoCheck();
      const guest = { user: { _id: "guest", username } };
      state.userInfo = guest;
      localStorage.setItem("userInfo", JSON.stringify(guest));
    },
  },
});
export const { setCredentials, removeCredentials, generateGuestCredentials } =
  authSlice.actions;

export default authSlice.reducer;
