const { configureStore } = require("@reduxjs/toolkit");

import user from "../services/user.service";

const rootReducer = { user };

const store = configureStore({ reducer: rootReducer });

export default store;
