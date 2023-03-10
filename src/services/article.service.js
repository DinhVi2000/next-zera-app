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
  },
  reducers: {
    setArticleCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

const { actions, reducer } = article;
export const { setArticleCategories } = actions;

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

const getArticleById = async (id) => {
  try {
    const { data } = await http.get(`/article/${id}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
};

const getArticleBySlug = async (slug) => {
  try {
    const { data } = await http.get(`/article/${slug}`);

    if (!data.success) {
      throw new Error(data?.message);
    }

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

    return data.data;
  } catch (e) {
    throw e;
  }
};

export { getAllArticleCategory, getArticleBySlug, getArticlesByCategorySlug };
export default reducer;
