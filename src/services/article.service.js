/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

const article = createSlice({
  name: "article",
  initialState: {
    info: null,
    categories: null,
    articleNewest: null,
    articleRandom: null,
  },
  reducers: {
    setArticleCategories: (state, action) => {
      state.categories = action.payload;
    },
    setArticleNewest: (state, action) => {
      state.articleNewest = action.payload;
    },
    setArticleRandom: (state, action) => {
      state.articleRandom = action.payload;
    },
  },
});

const { actions, reducer } = article;
export const { setArticleCategories, setArticleNewest, setArticleRandom } =
  actions;

const getAllArticleCategory = async (dispatch) => {
  try {
    const { data } = await http.get("/article/category");

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setArticleCategories(data?.data?.rows));

    return data;
  } catch (e) {
    throw e;
  }
};

const getArticleBySlug = async (slug) => {
  try {
    const { data } = await http.get(`/article/detail/${slug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data.data;
  } catch (e) {
    throw e;
  }
};

const getAllArticleTag = async () => {
  try {
    const { data } = await http.get(`/article/tag`);
    if (!data.success) throw new Error(data?.message);

    return data.data;
  } catch (e) {
    throw e;
  }
};

const getArticlesByCategorySlug = async (slug) => {
  try {
    const { data } = await http.get(`/article/category/${slug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data?.data?.articles;
  } catch (e) {
    throw e;
  }
};

const getArticlesByTagSlug = async (slug) => {
  try {
    const { data } = await http.get(`/article/tag/${slug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data.data;
  } catch (e) {
    throw e;
  }
};

const getArticlesNewest = async (dispatch) => {
  try {
    const { data } = await http.get(`/article/newest`);

    if (!data.success) {
      throw new Error(data?.message);
    }
    dispatch(setArticleNewest(data?.data?.rows));

    return data?.data?.rows;
  } catch (e) {
    throw e;
  }
};

const getArticlesRandom = async (dispatch) => {
  try {
    const { data } = await http.get(`/article/random`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setArticleRandom(data?.data));
    return data?.data;
  } catch (e) {
    throw e;
  }
};

export {
  getArticlesRandom,
  getArticlesNewest,
  getArticlesByTagSlug,
  getAllArticleCategory,
  getAllArticleTag,
  getArticleBySlug,
  getArticlesByCategorySlug,
};
export default reducer;
