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
export { getGamesByKeySearch };
export default reducer;
