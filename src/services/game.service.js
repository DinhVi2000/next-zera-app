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
    gameIndex: {
      games: null,
      categories: null,
    },
    gameDetail: {
      info: null,
      gamesRelate: null,
      hallOfFame: null,
      messages: [],
    },
    categories: null,
    categoryDetail: null,
    gameDetailByTag: null,
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
    setGameDetailByTag: (state, action) => {
      state.gameDetailByTag = action.payload;
    },
    setMessageGame: (state, action) => {
      state.gameDetail.messages = action.payload;
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
  setMessageGame,
  setGameDetailByTag,
} = actions;

const getMessages = async (dispatch, id) => {
  try {
    const { data } = await http.get(`/game/${id}/messages`);

    if (!data.success) {
      throw new Error(data?.message);
    }
    dispatch(setMessageGame(data?.data));

    return data?.data;
  } catch (e) {
    throw e;
  }
};

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

const getCategoryBySlug = async (dispatch, slug) => {
  try {
    const { data } = await http.get(`/game/category/${slug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setCategoryDetail(data?.data));

    return data.data;
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

const getGamesByTagSlug = async (dispatch, tagSlug) => {
  try {
    const { data } = await http.get(`/game/tag/${tagSlug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setGameDetailByTag(data.data));

    return data.data;
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

const getGameDetailBySlug = async (dispatch, slug) => {
  try {
    const { data } = await http.get(`/game/detail/${slug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setInfoAtGameDetail(data?.data));

    return data.data;
  } catch (e) {
    throw e;
  }
};

const getGameByCategorySlug = async (dispatch, slug) => {
  try {
    const { data } = await http.get(`/game/category/${slug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(
      setGamesRelateAtGameDetail(data?.data?.game_category?.game_detail)
    );

    return data;
  } catch (e) {
    throw e;
  }
};

const getGameRecentlyPlayed = async () => {
  try {
    const { data } = await http.get("/game/recently-played");

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data?.data?.rows;
  } catch (e) {
    throw e;
  }
};

const getHallOfFameByGameSlug = async (dispatch, slug, limit) => {
  try {
    const { data } = await http.get(`/hall-of-fames/${slug}/game`, { limit });

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setHallOfFameAtGameDetail(data.data));
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

const createPlaylist = async (body) => {
  try {
    const { data } = await http.post(`/game/playlist`, body);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getAllPlaylist = async (game_slug) => {
  try {
    const { data } = await http.get(
      `/game/playlist`,
      game_slug && { params: { game_slug } }
    );

    if (!data.success) {
      throw new Error(data?.message);
    }
    return data?.data;
  } catch (e) {
    throw e;
  }
};

const deletePlaylist = async (id) => {
  try {
    const { data } = await http.delete(`/game/playlist/${id}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getAllGamePlaylist = async (id) => {
  try {
    const { data } = await http.get(`/game/playlist/${id}/item`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data?.data;
  } catch (e) {
    throw e;
  }
};

const addGameToPlaylist = async (body) => {
  try {
    const { data } = await http.post(`/game/playlist/item`, body);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const deleteGamePlaylist = async (id) => {
  try {
    const { data } = await http.delete(`/game/playlist/item/${id}`);

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

    return data?.data;
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

const reportGame = async (params, slug) => {
  try {
    const { data } = await http.post(`game/${slug}/report`, params);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getAllGameTagBySuperslug = async (superslug) => {
  try {
    const { data } = await http.get(`game/${superslug}/tag`);
    if (!data.success) throw new Error(data?.message);

    return data?.data;
  } catch (e) {
    throw e;
  }
};

export {
  getAllGame,
  getAllCategories,
  getAllGameTagBySuperslug,
  getGameByCategorySlug,
  getGamesByTagSlug,
  getGamesByKeySearch,
  getGameDetailBySlug,
  getGameDetailById,
  getGameRecentlyPlayed,
  getCategoryBySlug,
  getHallOfFameByGameSlug,
  getLovedGames,
  createPlaylist,
  getAllPlaylist,
  getAllGamePlaylist,
  deletePlaylist,
  addGameToPlaylist,
  deleteGamePlaylist,
  getMostPlayed,
  addGameLove,
  reportGame,
  getMessages,
};
export default reducer;
