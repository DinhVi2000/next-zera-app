/* eslint-disable no-console */
/* eslint-disable quotes */
// eslint-disable-next-line quotes
import { http } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

// User slice
const user = createSlice({
  name: "user",
  initialState: {
    info: null,
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = { ...action.payload };
    },
  },
});

const { actions, reducer } = user;
export const { setInfo } = actions;

// User services
const getTodos = async () => {
  try {
    const { data } = await http.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { getTodos };
export default reducer;
