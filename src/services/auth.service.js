/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

// Authentication slice
const auth = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
  },
});

const { actions, reducer } = auth;
export const { setUser: setInfo } = actions;

// Authentication services
const verifySSOToken = async (params) => {
  try {
    const { data } = await http.post("/auth/sso", params);
    return data.data;
  } catch (e) {
    throw e;
  }
};

const registerEmail = async (params) => {
  try {
    const { data } = await http.post("/auth/register-email", params);
    return data.data;
  } catch (e) {
    throw e;
  }
};

export { verifySSOToken, registerEmail };
export default reducer;
