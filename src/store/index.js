const { configureStore } = require("@reduxjs/toolkit");

import user from "@/services/user.service";
import game from "@/services/user.service";

const rootReducer = { user, game };

const store = configureStore({ reducer: rootReducer });

export default store;
