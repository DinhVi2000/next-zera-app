/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import Script from "next/script";

import { loginWithEmail } from "@/services/auth.service";
import { getUserInfo, getUserIp } from "@/services/user.service";
import { getGameRecentlyPlayed } from "@/services/game.service";

import { notifyErrorMessage } from "@/utils/helper";

import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/router";

import { PRIVATE_PAGE_URL, PUBLIC_PAGE_URL, STATUS } from "@/utils/constant";

import { signInAnonymously } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  const { authProvider } = authContext;
  return useMemo(() => ({ ...authProvider }), [authProvider]);
};

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const { call } = useApi();

  const [userInfo, setUserInfo] = useState();
  const [isCountDown, setIsCountDown] = useState(false);
  const [anonymousInfo, setAnonymousInfo] = useState();

  const [token, setToken] = useState();
  const [usernameAuth, setUsernameAuth] = useState();

  const [isAuthenticationPage, setIsAuthenticationPage] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState(STATUS.NOT_START);

  const { pathname } = router ?? {};

  const verifyAccessToken = async () => {
    try {
      setVerifyStatus(STATUS.IN_PROGRESS);
      const { data } = await getUserInfo(usernameAuth);

      setUserInfo(data);
      setVerifyStatus(STATUS.SUCCESS);
    } catch (error) {
      notifyErrorMessage(toast, error);
      setVerifyStatus(STATUS.FAIL);

      clearAuthenticatorData();
    }
  };

  const login = async (formData) => {
    try {
      const {
        data: { token, username },
      } = await loginWithEmail(formData);

      localStorage.setItem("accessToken", token);
      if (!username) return router.push("/create-username");

      localStorage.setItem("username", username);

      setToken(token);
      setUsernameAuth(username);

      router.push("/");
    } catch (error) {
      notifyErrorMessage(toast, error);
    }
  };

  const logout = () => {
    clearAuthenticatorData();
    router.push("/login");
  };

  const clearAuthenticatorData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    setToken("");
    setUsernameAuth("");
  };

  const loginWithAnonymously = async () => {
    try {
      const { user } = (await signInAnonymously(auth)) ?? {};
      const { uid } = user ?? {};

      if (uid) setAnonymousInfo((prev) => ({ ...prev, id: uid }));
    } catch (error) {
      notifyErrorMessage(error);
    }
  };

  const isAuthnrPath = useMemo(
    () => Object.values(PUBLIC_PAGE_URL).includes(pathname),
    [pathname]
  );

  const isPrivatePath = useMemo(
    () => Object.values(PRIVATE_PAGE_URL).includes(pathname),
    [pathname]
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");

    if (!accessToken || !username) loginWithAnonymously();

    setToken(accessToken || "");
    setUsernameAuth(username || "");
  }, []);

  useEffect(() => {
    if (token && usernameAuth && !isAuthnrPath) {
      setIsAuthenticationPage(false);
      Promise.all([verifyAccessToken(), call(getGameRecentlyPlayed(dispatch))]);
    }
  }, [token, usernameAuth, pathname]);

  useEffect(() => {
    if (!pathname) return;

    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");

    const isLogged = accessToken && username;

    if (isAuthnrPath && isLogged) router.push("/");
    if (isPrivatePath && !isLogged) router.push("/login");
    else setIsAuthenticationPage(false);
  }, [pathname]);

  const authProvider = useMemo(
    () => ({
      anonymousInfo,
      login,
      logout,
      userInfo,
      usernameAuth,
      setToken,
      setUserInfo,
      setAnonymousInfo,
      setUsernameAuth,
      setVerifyStatus,
      token,
      verifyStatus,
    }),
    [
      anonymousInfo,
      login,
      logout,
      userInfo,
      usernameAuth,
      setToken,
      setUserInfo,
      setAnonymousInfo,
      setUsernameAuth,
      setVerifyStatus,
      token,
      verifyStatus,
    ]
  );

  return (
    <AuthContext.Provider value={{ authProvider }}>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></Script>
      {!isAuthenticationPage && children}
    </AuthContext.Provider>
  );
};
