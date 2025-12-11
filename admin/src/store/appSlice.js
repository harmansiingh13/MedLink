import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencySymbol: "$",
  dToken: localStorage.getItem("dToken") ?? "",
  aToken: localStorage.getItem("aToken") ?? "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDoctorToken(state, action) {
      state.dToken = action.payload;
      localStorage.setItem("dToken", action.payload);
    },
    clearDoctorToken(state) {
      state.dToken = "";
      localStorage.removeItem("dToken");
    },
    setAdminToken(state, action) {
      state.aToken = action.payload;
      localStorage.setItem("aToken", action.payload);
    },
    clearAdminToken(state) {
      state.aToken = "";
      localStorage.removeItem("aToken");
    },
  },
});

export const {
  setDoctorToken,
  clearDoctorToken,
  setAdminToken,
  clearAdminToken,
} = appSlice.actions;

export default appSlice.reducer;
