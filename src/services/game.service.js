/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

// Game slice
const game = createSlice({
  name: "game",
  initialState: {
    info: null,
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = { ...action.payload };
    },
  },
});

const { actions, reducer } = game;
export const { setInfo } = actions;

const getGamesByKeySearch = async (keySearch) => {
  try {
    const { data } = await http.get("/game/search", {
      params: { keySearch },
    });
    return data.data;
  } catch (e) {
    throw e;
  }
};

const getAllCategories = async () => {
  try {
    const { data } = await http.get("/game/categories");
    return data;
  } catch (e) {
    throw e;
  }
};

const getGameDetailBySlug = async (params) => {
  try {
    const { super_slug, game_slug } = params || {};
    const { data } = await http.get(`/game/detail/${super_slug}/${game_slug}`);
    return data;
  } catch (e) {
    throw e;
  }
};

const getGameByCategoryId = async (categoryId) => {
  try {
    const { data } = await http.get(`/game/category/${categoryId}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export {
  getGamesByKeySearch,
  getAllCategories,
  getGameDetailBySlug,
  getGameByCategoryId,
};
export default reducer;
