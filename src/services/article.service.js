/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

const article = createSlice({
  name: "article",
  initialState: {
    info: null,
    articleIndex: {
      articles: null,
    },
  },
  reducers: {
    setArticlesAtArticleIndex: (state, action) => {
      state.articleIndex.articles = action.payload;
    },
  },
});

const { actions, reducer } = article;
export const { setArticlesAtArticleIndex } = actions;

const getAllArticle = async (dispatch) => {
  try {
    const { data } = await http.get("/article");

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setArticlesAtArticleIndex(data?.data?.rows));

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

export { getAllArticle, getArticleById };
export default reducer;
