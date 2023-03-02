const { configureStore } = require("@reduxjs/toolkit");

import user from "@/services/user.service";
import game from "@/services/game.service";
import article from "@/services/article.service";

const rootReducer = { user, game, article };

const store = configureStore({ reducer: rootReducer });

export default store;
