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
    achievement: null,
    hallOfFame: {
      zera: null,
      games_played: null,
      playstreak: null,
    },
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = { ...action.payload };
    },
    setAchievement: (state, action) => {
      state.achievement = { ...action.payload };
    },
    setHallOfFame: (state, action) => {
      state.hallOfFame = { ...state.hallOfFame, ...action.payload };
    },
  },
});

const { actions, reducer } = user;
export const {
  setInfo,
  setAchievement,
  setHallOfFame,
  setRecentlyPlayedGames,
} = actions;

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

const getUserAnonymous = async (id) => {
  try {
    const { data } = await http.get(`/users/anonymous/${id}`);
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data.data;
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
    const { data } = await http.get(`/hall-of-fames/${username}`);
    if (!data.success) throw new Error(data?.message);

    dispatch(setAchievement(data.data));

    return data.data;
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

const updateUsername = async (formData, token) => {
  try {
    const { data } = await http.put("/users/username", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
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

    return data?.data;
  } catch (e) {
    throw e;
  }
};

const getUserReward = async () => {
  try {
    const { data } = await http.get("users/reward");
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getShareToEarn = async () => {
  try {
    const { data } = await http.get("users/share-to-earn");
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const postNewsletter = async (body) => {
  try {
    const { data } = await http.post("users/newsletter", body);
    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const contact = async () => {
  try {
    const { data } = await http.get("/contacts");
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
  getUserReward,
  getUserAnonymous,
  getShareToEarn,
  postNewsletter,
  contact,
};
export default reducer;
