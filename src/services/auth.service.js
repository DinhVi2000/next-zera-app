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
    if (!data.success) {
      throw new Error(data?.message);
    }
    return data;
  } catch (e) {
    throw e;
  }
};

// Login with email
const loginWithEmail = async (params) => {
  try {
    const { data } = await http.post("/auth/login-email", params);
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const registerEmail = async (params) => {
  try {
    const { data } = await http.post("/auth/register-email", params);
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

export { verifySSOToken, loginWithEmail, registerEmail };
export default reducer;
