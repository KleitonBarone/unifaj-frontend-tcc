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
      state.userType = payload.userType
      console.log(state.isLoggedIn)
      localStorage.setItem("IS_LOGGED",state.isLoggedIn)
      localStorage.setItem("EMAIL",state.email)
      localStorage.setItem("USERNAME",state.name)
      localStorage.setItem("USER_TYPE",state.userType)
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.name = "";
      state.token = "";

      localStorage.removeItem("IS_LOGGED")
      localStorage.removeItem("EMAIL")
      localStorage.removeItem("USERNAME")
      localStorage.removeItem("USER_TYPE")
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
