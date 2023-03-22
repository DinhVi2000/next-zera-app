/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginWithEmail } from "@/services/auth.service";
import { getPurchaseHistory, getUserInfo } from "@/services/user.service";
import {
  getGameRecentlyPlayed,
  getLovedGames,
  getMostPlayed,
  getAllPlaylist,
} from "@/services/game.service";
import { notifyErrorMessage } from "@/utils/helper";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/router";
import {
  PRIVATE_PAGE_URL,
  PUBLIC_PAGE_URL,
  SOCKET_EVENT,
  STATUS,
} from "@/utils/constant";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import { useSocketContext } from "./socket-context";

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

const userInfoFunctions = [
  {
    key: "recentlyPlayed",
    callback: getGameRecentlyPlayed,
  },
  {
    key: "loved",
    callback: getLovedGames,
  },
  {
    key: "playlist",
    callback: getAllPlaylist,
  },
  {
    key: "purchaseHistory",
    callback: getPurchaseHistory,
  },
  {
    key: "mostPlayed",
    callback: getMostPlayed,
  },
];

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const { call } = useApi();

  const [userInfo, setUserInfo] = useState();

  const [anonymousInfo, setAnonymousInfo] = useState();
  const [token, setToken] = useState();
  const [usernameAuth, setUsernameAuth] = useState();
  const [isAuthenticationPage, setIsAuthenticationPage] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState(STATUS.NOT_START);
  const { pathname } = router ?? {};
  const { socketClient, receiveZera } = useSocketContext();

  const handleSetUserInfo = async () => {
    setVerifyStatus(STATUS.IN_PROGRESS);
    getUserInfo(usernameAuth)
      .then((response) => {
        setUserInfo((prev) => ({ ...response?.data, ...prev }));
        setVerifyStatus(STATUS.SUCCESS);
      })
      .catch((e) => {
        setVerifyStatus(STATUS.FAIL);
        notifyErrorMessage(toast, e);
      });
  };

  const verifyAccessToken = async () => {
    try {
      Promise.all([
        handleSetUserInfo(),
        ...userInfoFunctions.map(({ key, callback }) =>
          callback()
            .then((data) =>
              setUserInfo((prev) => {
                if (!prev) prev = {};
                prev[key] = data;
                return { ...prev };
              })
            )
            .catch((e) => {
              throw e;
            })
        ),
      ]);
    } catch (error) {
      notifyErrorMessage(toast, error);
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
    setUserInfo();
  };

  const loginWithAnonymously = async () => {
    try {
      const { user } = (await signInAnonymously(auth)) ?? {};
      const { uid } = user ?? {};

      if (uid) setAnonymousInfo((prev) => ({ ...prev, ...user }));
    } catch (error) {
      notifyErrorMessage(toast, error);
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

  const remainingTime = (data) => {
    if (data) {
      setUserInfo((prev) => ({ ...prev, playtime: data.remainingTime }));
    }
  };

  useEffect(() => {
    if (!socketClient) return;
    socketClient.on(SOCKET_EVENT.TIME_GAME, remainingTime);
    return () => {
      if (!socketClient) return;
      socketClient.off(SOCKET_EVENT.TIME_GAME);
    };
  }, [socketClient]);

  useEffect(() => {
    if (receiveZera > 0) {
      setUserInfo((prev) => ({ ...prev, zera: receiveZera + prev.zera }));
    }
  }, [receiveZera]);

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
      Promise.all([verifyAccessToken()]);
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
      handleSetUserInfo,
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
      handleSetUserInfo,
    ]
  );

  return (
    <AuthContext.Provider value={{ authProvider }}>
      {!isAuthenticationPage && children}
    </AuthContext.Provider>
  );
};
