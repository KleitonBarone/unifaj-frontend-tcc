import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: '',
  name: '',
  email:'',
  userType:''
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state,param) => {
      const { payload } = param
      console.log(payload)
      state.isLoggedIn = true;
      state.email = payload.email;
      state.name = payload.name;
      state.token = payload.token;

      console.log(state)
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
