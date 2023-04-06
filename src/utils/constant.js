import DEFAULT_AVATAR from "@/../public/images/default-avatar.png";
import { staticPaths } from "./$path";

const DEFAULT_AVATAR_SRC = DEFAULT_AVATAR.src;

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
  DAILY_BONUS: "DAILY_BONUS",
  BUY: "BUY",
  PLAYLIST: "PLAYLIST",
  DELETE_PLAYLIST: "DELETE_PLAYLIST",
  CONFIRM: "CONFIRM",
  REPORT: "REPORT",
  NONE: "NONE",
  BUYTIME: "BUYTIME",
  USERS_ONLINE_GAME: "USERS_ONLINE_GAME",
  RESET_LOGIN: "RESET_LOGIN",
};

const SHOP_TAB = {
  AVATAR: "Avatars",
  COVER_PAGE: "Cover Pages",
  PLAYTIMES: "Playtimes",
};

const STATUS = {
  NOT_START: "NOT_START",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  INIT: "INIT",
};

const PUBLIC_PAGE_URL = {
  LOGIN: staticPaths.login,
  REGISTER: staticPaths.register,
  FORGOT_PASSWPORD: staticPaths.forgot_password,
  RESET_PASSWPORD: staticPaths.reset_password,
  MAINTENANCE: staticPaths.maintenance,
  404: staticPaths.not_found,
};

const PRIVATE_PAGE_URL = {
  SHOP: "/shop",
  MY_HALL_OF_FAME: "/achievements",
};

const COUNTDOWN_DEADLINE = "11/20/2023 20:00:00";

const GAMES_IMAGES = [
  "https://img.poki.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/b3668d7deb043d0f43b5813b0365be8f.png",
  "https://img.poki.com/cdn-cgi/image/quality=78,width=94,height=94,fit=cover,f=auto/bc02c9cdfc5b424ddf343b01edf791ce.png",
  "https://img.poki.com/cdn-cgi/image/quality=78,width=204,height=204,fit=cover,f=auto/9b373b5219cd66a82389d81d7cda8e23.jpeg",
  "https://img.poki.com/cdn-cgi/image/quality=78,widt…cover,f=auto/70e565ff687043e10e150e23d0ae5ea2.png",
  "https://img.poki.com/cdn-cgi/image/quality=78,widt…cover,f=auto/1a9642e779cab413962255ea953d1155.png",
  "https://a.poki.com/cdn-cgi/image/f=auto,width=204,height=204,quality=78/cr-mv/dinosaur-blue-l.png",
  "https://img.poki.com/cdn-cgi/image/quality=78,widt…cover,f=auto/f8a2160e52333ee0d44ec19e8ca65139.png",
  "https://img.poki.com/cdn-cgi/image/quality=78,widt…cover,f=auto/e327f46027899af3e9573ef51450bb54.png",
  "https://img.poki.com/cdn-cgi/image/quality=78,widt…cover,f=auto/e327f46027899af3e9573ef51450bb54.png",
];

const ADS_IMAGES = [
  "	https://i.imgur.com/3mLIbjl.gif",
  "https://mir-s3-cdn-cf.behance.net/projects/404/7322fa156969761.Y3JvcCwyMjAwLDE3MjAsMCwyNzI.png",
  "https://i.pinimg.com/736x/fa/5d/b4/fa5db40d48fdbb0fb8cf1c4a2fcaca7b.jpg",
  "https://vao88.com/wp-content/uploads/2021/06/fb88-ads.gif",
];

const SOCKET_EVENT = {
  LISTEN_MESSAGE: "message",
  LIST_USERS_JOIN_ROOM: "roomUsers",
  USER_JOIN_ROOM: "joinRoom",
  USER_LEAVE_ROOM: "leaveRoom",
  PLAY_GAME: "playGame",
  ANONYMOUS_LOGIN: "loginAnonymous",
  USER_DUPLICATE_LOGIN: "duplicateLogin",
  STOP_PLAY: "stopPlay",
  OUT_OF_TIME: "outOfTime",

  USER_EMIT_REWARD: "emitReward",
  USER_LOGIN: "userLogin",
  USER_LOGOUT: "userLogout",
  LOGGED_IN_USER: "loggedInUser",
  STOP_GAME: "stopGame",
  SEND_MESSAGE: "chatMessage",
  SOCKET_ERROR: "error",
  TIME_GAME: "timeGame",
};

const PLAYTIME_CATEGORY = "Playtimes";

const MAX_SECOND_LIMIT_CHAT = 59; // start with 0 -> 59;
const MAX_LIMIT_MESSAGE = 5;
const SUPERSLUGS_CODES = {
  GAME: "game",
  ARTICLE: "article",
};

const MESSAGE_MAX_LENGTH = 150;

const HTTP_ERROR_CODE = {
  UN_AUTHORIZATION: [401],
  UNDER_MAINTENANCE: 503,
};

const PREFIX_USERNAME = "@";
const HALL_OF_FAME_TAB = [
  { label: "ZERA", value: "zera" },
  {
    label: "Games played",
    value: "games_played",
  },
  {
    label: "Playstreak",
    value: "playstreak",
  },
];
const STATUS_PLAY_GAME = {
  PLAY: "PLAY",
  STOP: "STOP",
  NONE: "NONE",
};
const USER_STATUS = {
  NOT_LOGGED: "NOT_LOGGED",
  VERIFYING: "VERIFYING",
  VERIFY_SUCCESS: "VERIFY_SUCCESS",
  VERIFY_FAIL: "VERIFY_FAIL",
};

const QUANTITY_BY_TAB = {
  zera: (e) => parseFloat(e?.total_earned_zera) || "",
  games_played: (e) => e?.total_games_played,
  playstreak: (e) => e?.streak,
};

const MESSAGE_TYPE = {
  SYSTEM_MESSAGE: "SYSTEM_MESSAGE",
  MY_MESSAGE: "MY_MESSAGE",
  USER_MESSAGE: "USER_MESSAGE",
};

const PLAY_STATUS = {
  INIT: "INIT",
  IN_PROGRESS: "IN_PROGRESS",
  STOP: "STOP",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

export {
  MAX_SECOND_LIMIT_CHAT,
  MAX_LIMIT_MESSAGE,
  ADS_IMAGES,
  COUNTDOWN_DEADLINE,
  FACEBOOK_SIGN_IN_ERROR,
  GAMES_IMAGES,
  IMAGE_URL,
  MODAL_NAME,
  PRIVATE_PAGE_URL,
  PUBLIC_PAGE_URL,
  SSO_METHOD,
  SHOP_TAB,
  STATUS,
  SOCKET_EVENT,
  PLAYTIME_CATEGORY,
  MESSAGE_MAX_LENGTH,
  SUPERSLUGS_CODES,
  HTTP_ERROR_CODE,
  HALL_OF_FAME_TAB,
  DEFAULT_AVATAR_SRC,
  PREFIX_USERNAME,
  STATUS_PLAY_GAME,
  QUANTITY_BY_TAB,
  USER_STATUS,
  MESSAGE_TYPE,
  PLAY_STATUS,
};
