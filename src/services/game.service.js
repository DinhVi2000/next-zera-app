/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";
import { setRecentlyPlayedGames } from "./user.service";

// Game slice
const game = createSlice({
  name: "game",
  initialState: {
    info: null,
    gameIndex: {
      games: null,
      categories: null,
    },
    gameDetail: {
      info: null,
      gamesRelate: null,
      hallOfFame: null,
    },
    categories: null,
    categoryDetail: null,
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = { ...action.payload };
    },
    setInfoAtGameDetail: (state, action) => {
      state.gameDetail.info = action.payload;
    },
    setGamesRelateAtGameDetail: (state, action) => {
      state.gameDetail.gamesRelate = action.payload;
    },
    setHallOfFameAtGameDetail: (state, action) => {
      state.gameDetail.hallOfFame = action.payload;
    },
    setGamesAtGameIndex: (state, action) => {
      state.gameIndex.games = action.payload;
    },
    setCategoriesAtGameIndex: (state, action) => {
      state.gameIndex.categories = action.payload;
    },
    setCategoryDetail: (state, action) => {
      state.categoryDetail = action.payload;
    },
  },
});

const { actions, reducer } = game;
export const {
  setInfo,
  setInfoAtGameDetail,
  setGamesRelateAtGameDetail,
  setGamesAtGameIndex,
  setCategoriesAtGameIndex,
  setCategoryDetail,
  setHallOfFameAtGameDetail,
} = actions;

const getAllGame = async (dispatch, params) => {
  try {
    const { data } = await http.get("/game", { params });

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setGamesAtGameIndex(data?.data?.rows));

    return data;
  } catch (e) {
    throw e;
  }
};

const getAllCategories = async (dispatch, params) => {
  try {
    const { data } = await http.get("/game/categories", { params });

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setCategoriesAtGameIndex(data?.data));

    return data;
  } catch (e) {
    throw e;
  }
};

const getCategoryById = async (dispatch, categoryId) => {
  try {
    const { data } = await http.get(`/game/category/${categoryId}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setCategoryDetail(data?.data));

    return data;
  } catch (e) {
    throw e;
  }
};

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

    dispatch(setInfoAtGameDetail(data?.data));

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

    dispatch(setGamesRelateAtGameDetail(data?.data?.rows));

    return data;
  } catch (e) {
    throw e;
  }
};

const getGameRecentlyPlayed = async (dispatch) => {
  try {
    const { data } = await http.get("/game/recently-played");

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setRecentlyPlayedGames(data?.data));

    return data;
  } catch (e) {
    throw e;
  }
};

const getHallOfFameByGameId = async (dispatch, gameId, limit) => {
  try {
    const { data } = await http.get(`/hall-of-fames/${gameId}/game`, { limit });

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setHallOfFameAtGameDetail(data.data));
    return data;
  } catch (e) {
    throw e;
  }
};

const getRecentlyGames = async () => {
  try {
    const { data } = await http.get(`game/recently-played`);
    if (!data.success) {
      throw new Error(data?.message);
    }
    return data;
  } catch (e) {
    throw e;
  }
};

const getLovedGames = async () => {
  try {
    const { data } = await http.get(`/game/loved`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getPlaylist = async () => {
  try {
    const { data } = await http.get(`/game/playlist`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getMostPlayed = async () => {
  try {
    const { data } = await http.get(`game/most-played`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const addGameLove = async (params) => {
  try {
    const { data } = await http.post(`game/love`, params);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const addGamePlaylist = async (params) => {
  try {
    const { data } = await http.post(`game/add-playlist`, params);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

export {
  getAllGame,
  getAllCategories,
  getGameByCategoryId,
  getGamesByKeySearch,
  getGameDetailBySlug,
  getGameDetailById,
  getGameRecentlyPlayed,
  getCategoryById,
  getHallOfFameByGameId,
  getRecentlyGames,
  getLovedGames,
  getPlaylist,
  getMostPlayed,
  addGameLove,
  addGamePlaylist,
};
export default reducer;
