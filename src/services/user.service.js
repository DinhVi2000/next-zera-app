/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
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

// Login with email
const getUserInfo = async (username) => {
  try {
    const { data } = await http.get(`/users/profile/${username}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export { getUserInfo };
export default reducer;
