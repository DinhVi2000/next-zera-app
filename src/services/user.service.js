/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { createSlice } from "@reduxjs/toolkit";

// User slice
const user = createSlice({
  name: "user",
  initialState: {
    info: null,
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = { ...action.payload };
    },
  },
});

const { actions, reducer } = user;
export const { setInfo } = actions;

export default reducer;
