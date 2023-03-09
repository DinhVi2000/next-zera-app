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
  VIEW_PURCHASE_HISTORY: "VIEW_PURCHASE_HISTORY",
  DAILY_BONUS: "DAILY_BONUS",
  BUY: "BUY",
  CONFIRM: "CONFIRM",
  NONE: "NONE",
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

const VIEW_ALL_GAMES_TAB = {
  RECENT_GAMES: "RECENT_GAMES",
  LOVED_GAMES: "LOVED_GAMES",
  PLAYLIST: "PLAYLIST",
  PURCHASE_HISTORY: "PURCHASE_HISTORY",
};

const PUBLIC_PAGE_URL = {
  LOGIN: "/login",
  REGISTER: "/register",
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
  USER_GET_MESSAGE: "message",
  USER_CHAT_MESSAGE: "chatMessage",
  USER_EMIT_REWARD: "emitReward",
  USER_LEAVE_ROOM: "leaveRoom",
  SOCKET_ERROR: "error",
  ANONYMOUS_LOGIN: "loginAnonymous",
  STOP_GAME: "stopGame",
  PLAY_GAME: "playGame",
  TIME_GAME: "timeGame",
};

const CLASS_NAME_BY_PATH = {
  "/game/[gameId]": "tbl-hidden mb-hidden",
  "/category/[categoryId]": "mb-hidden",
  "/": "mb-hidden",
};

export {
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
  VIEW_ALL_GAMES_TAB,
};
