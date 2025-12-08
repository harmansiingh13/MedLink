import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencySymbol: "$",
  token: localStorage.getItem("token") || "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, clearToken } = appSlice.actions;
export default appSlice.reducer;
