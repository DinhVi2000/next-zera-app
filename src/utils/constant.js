const IMAGE_URL =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const FACEBOOK_SIGN_IN_ERROR = {
  accountExistWithDifferentCredential:
    "auth/account-exists-with-different-credential",
  userClosePopup: "auth/popup-closed-by-user",
};

const SSO_METHOD = {
  GOOGLE: "GOOGLE",
  FACEBOOK: "FACEBOOK",
};

const MODAL_NAME = {
  MENUBAR: "MENUBAR",
  EDIT_PROFILE: "EDIT_PROFILE",
  VIEW_ALL_GAMES: "VIEW_ALL_GAMES",
  DAILY_BONUS: "DAILY_BONUS",
  NONE: "NONE",
};

const SIMPLE_SHOP_TAB = {
  AVATAR: "AVATAR",
  COVER_PAGE: "COVER_PAGE",
  PLAYTIMES: "PLAYTIMES",
};

const STATUS = {
  NOT_START: "NOT_START",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

const EDIT_PROFILE_TAB = {
  AVATAR: "AVATAR",
  COVER_PAGE: "COVER_PAGE",
};

const VIEW_ALL_GAMES_TABS = {
  RECENT_GAMES: "RECENT_GAMES",
  LOVED_GAMES: "LOVED_GAMES",
  PLAYLIST: "PLAYLIST",
  PURCHASE_HISTORY: "PURCHASE_HISTORY",
};

const PUBLIC_PAGE_URL = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export {
  FACEBOOK_SIGN_IN_ERROR,
  IMAGE_URL,
  MODAL_NAME,
  SSO_METHOD,
  SIMPLE_SHOP_TAB,
  STATUS,
  EDIT_PROFILE_TAB,
  VIEW_ALL_GAMES_TABS,
  PUBLIC_PAGE_URL,
};
