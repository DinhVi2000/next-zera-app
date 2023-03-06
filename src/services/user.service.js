/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

const getUserIp = async () => {
  try {
    const { data } = await axios.get("https://api.db-ip.com/v2/free/self");

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

const getHallOfFameByUserId = async () => {
  try {
    const { data } = await http.get("/users/hall-of-fames");
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const updateUser = async (params) => {
  try {
    const { data } = await http.put("/users", params);
    if (!data.success) {
      throw new Error(data?.message);
    }
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

const getCategoriesInventory = async () => {
  try {
    const { data } = await http.get("/users/inventories");
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getItemInventory = async (params) => {
  try {
    const { data } = await http.get(
      `/users/inventories?category_item_id=${params}`
    );
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const claimDailyBonus = async () => {
  try {
    const { data } = await http.post("/users/claim-daily-bonus");
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const statsUser = async () => {
  try {
    const { data } = await http.get("/users/statistic");
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};
const getPurchaseHistory = async () => {
  try {
    const { data } = await http.get("users/purchase-history");
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};


export {
  getUserInfo,
  getHallOfFameByUsername,
  getHallOfFameByUserId,
  getUserIp,
  updateUser,
  updateUsername,
  getCategoriesInventory,
  getItemInventory,
  claimDailyBonus,
  statsUser,
  getPurchaseHistory,
};
export default reducer;
