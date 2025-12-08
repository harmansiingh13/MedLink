import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: null,
  visible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      const { message, type } = action.payload;
      const id = Date.now();

      state.toast = { id, message, type };
      state.visible = true;
    },

    hideToast: (state) => {
      state.visible = false;
      state.toast = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
