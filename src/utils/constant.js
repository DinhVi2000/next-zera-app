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
  VIEW_PURCHASE_HISTORY: "VIEW_PURCHASE_HISTORY",
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
};

const PRIVATE_PAGE_URL = {
  SHOP: "/shop",
  MY_HALL_OF_FAME: "/hall-of-fame",
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
  USER_JOIN_ROOM: "joinRoom",
  USER_EMIT_REWARD: "emitReward",
  LISTEN_MESSAGE: "message",
  SEND_MESSAGE: "chatMessage",
  USER_LEAVE_ROOM: "leaveRoom",
  SOCKET_ERROR: "error",
  ANONYMOUS_LOGIN: "loginAnonymous",
  LIST_USERS_JOIN_ROOM: "roomUsers",
  STOP_GAME: "stopGame",
  PLAY_GAME: "playGame",
  TIME_GAME: "timeGame",
  USER_LOGIN: "userLogin",
  LOGGED_IN_USER: "loggedInUser",
  USER_LOGOUT: "userLogout",
};

const PLAYTIME_CATEGORY = "Playtimes";

const CLASS_NAME_BY_PATH = {
  "/[superslug]/[game-slug]": "tbl-hidden mb-hidden",
  "/[superslug]/category/[category-slug]": "tbl-hidden mb-hidden",
  "/article/category/[category-slug]": "tbl-hidden mb-hidden",
  "/article/tag/[tag-slug]": "tbl-hidden mb-hidden",
  "/article/[article-slug]": "tbl-hidden mb-hidden",
  "/profile": "tbl-hidden mb-hidden",
  "/about": "tbl-hidden mb-hidden",
  "/policy": "tbl-hidden mb-hidden",
  "/terms": "tbl-hidden mb-hidden",
  "/shop": "tbl-hidden mb-hidden",
  "/hall-of-fame/[username]": "tbl-hidden mb-hidden",
  "/hall-of-fame": "tbl-hidden mb-hidden",
  "/": "tbl-hidden mb-hidden",
};

const MAX_SECOND_LIMIT_CHAT = 59; // start with 0 -> 59;
const MAX_LIMIT_MESSAGE = 5;
const SUPERSLUGS_CODES = {
  GAME: "game",
  ARTICLE: "article",
};

const MESSAGE_MAX_LENGTH = 150;

const HTTP_ERROR_CODE = {
  UN_AUTHORIZATION: [401],
};

const PREFIX_USERNAME = "@";
const HALL_OF_FAME_TAB = [
  { label: "ZERA", value: "ZERA" },
  {
    label: "Game played",
    value: "GAME_PLAYED",
  },
  {
    label: "Playstreak",
    value: "PLAYSTREAK",
  },
];
const STATUS_PLAY_GAME = {
  PLAY: 'PLAY',
  STOP: 'STOP',
  NONE: 'NONE',
};

export {
  MAX_SECOND_LIMIT_CHAT,
  MAX_LIMIT_MESSAGE,
  ADS_IMAGES,
  COUNTDOWN_DEADLINE,
  CLASS_NAME_BY_PATH,
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
};
