/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

const advertisements = createSlice({
  name: "advertisements",
  initialState: {
    info: null,
    list: null,
  },
  reducers: {
    setListAdvertisements: (state, action) => {
      state.list = action.payload;
    },
  },
});

const { actions, reducer } = advertisements;
export const { setListAdvertisements } = actions;

const getAllAdvertisements = async (dispatch) => {
  try {
    const { data } = await http.get("/advertisements");

    if (!data.success) {
      throw new Error(data?.message);
    }

    dispatch(setListAdvertisements(data?.data));

    return data;
  } catch (e) {
    throw e;
  }
};

export { getAllAdvertisements };
export default reducer;
