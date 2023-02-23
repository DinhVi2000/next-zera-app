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
    gameDetail: {
      info: null,
      gamesRelate: null,
    },
    categories: null,
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = { ...action.payload };
    },
    setGameDetail: (state, action) => {
      state.gameDetail = { ...action.payload };
    },
  },
});

const { actions, reducer } = game;
export const { setInfo, setGameDetail } = actions;

const getGamesByKeySearch = async (keySearch) => {
  try {
    const { data } = await http.get("/game/search", {
      params: { keySearch },
    });

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data.data;
  } catch (e) {
    throw e;
  }
};

const getAllCategories = async () => {
  try {
    const { data } = await http.get("/game/categories");

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getGameDetailBySlug = async (params) => {
  try {
    const { super_slug, game_slug } = params || {};
    const { data } = await http.get(`/game/detail/${super_slug}/${game_slug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getGameDetailById = async (dispatch, gameId) => {
  try {
    const { data } = await http.get(`/game/detail/${gameId}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(
      setGameDetail({ ...game.getInitialState().gameDetail, info: data?.data })
    );

    return data;
  } catch (e) {
    throw e;
  }
};

const getGameByCategoryId = async (dispatch, categoryId) => {
  try {
    const { data } = await http.get(`/game/category/${categoryId}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(
      setGameDetail({
        ...game.getInitialState().gameDetail,
        gamesRelate: data?.data,
      })
    );
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
  getGameDetailById,
};
export default reducer;
