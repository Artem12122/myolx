import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "../../utils/jwtDecode";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, payload: null},
  reducers: {
    login(state, { payload: token }) {
      const payload = jwtDecode(token);
        if (payload) {
          state.payload = payload
          state.token = token
          state.userInfo = null
        }
    },
    logout(state) {
      state.payload = null
      state.token = null
      state.userInfo = null
    },
    aboutMe(state, { payload }) {
      state.userInfo = payload
    }
  }
});

export default authSlice;
