import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const accessToken = localStorage.getItem("accessToken") || null;

const initialState = {
  user: {
    id: cookies.get("id"),
    login: cookies.get("login") ?? null,
    accessToken,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { login, accessToken } = action.payload;
      console.log(accessToken);
      state.user.login = login ?? state.user.login;
      state.user.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    logOut: (state, action) => {
      state.user.login = null;
      state.user.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("todos");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user.login;
export const selectCurrentToken = (state) => state.auth.user.accessToken;
