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
  NONE: "NONE",
};

export { IMAGE_URL, FACEBOOK_SIGN_IN_ERROR, SSO_METHOD, MODAL_NAME };
