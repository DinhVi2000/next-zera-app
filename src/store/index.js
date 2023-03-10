const { configureStore } = require("@reduxjs/toolkit");

import user from "@/services/user.service";
import game from "@/services/game.service";
import article from "@/services/article.service";
import advertisements from "@/services/advertisements.service";

const rootReducer = { user, game, article, advertisements };

const store = configureStore({ reducer: rootReducer });

export default store;
