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
    hallOfFame: null,
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = { ...action.payload };
    },
    setHallOfFame: (state, action) => {
      state.hallOfFame = { ...action.payload };
    },
  },
});

const { actions, reducer } = user;
export const { setInfo, setHallOfFame } = actions;

const getUserInfo = async (username) => {
  try {
    const { data } = await http.get(`/users/profile/${username}`);
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getHallOfFameByUsername = async (dispatch, username) => {
  try {
    const { data } = await http.get(`/users/hall-of-fame/${username}`);
    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setHallOfFame(data.data));
    return data;
  } catch (e) {
    throw e;
  }
};

const updateUser = async (params) => {
  try {
    const { data } = await http.put("/users", params);
    localStorage.setItem("username", data.data.username);
    return data.data;
  } catch (e) {
    throw e;
  }
};

const updateUsername = async (formData) => {
  try {
    const { data } = await http.put("/users/username", formData);
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

export { getUserInfo, getHallOfFameByUsername, updateUser, updateUsername };
export default reducer;
