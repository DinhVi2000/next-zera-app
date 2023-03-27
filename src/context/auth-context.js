/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

import { useRouter } from "next/router";

import { PRIVATE_PAGE_URL, PUBLIC_PAGE_URL, STATUS } from "@/utils/constant";

import { signInAnonymously } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";

import { useSocketContext } from "./socket-context";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "useAuthContext() can only be used inside of <AuthContextProvider />, " +
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

  const [userInfo, setUserInfo] = useState();
  const [anonymousInfo, setAnonymousInfo] = useState();
  const [token, setToken] = useState();
  const [usernameAuth, setUsernameAuth] = useState();

  const [isAuthenticationPage, setIsAuthenticationPage] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState(STATUS.NOT_START);

  const prevRoute = useRef();
  const currentRoute = useRef();

  const { pathname } = router ?? {};
  const { socketClient, receiveZera, userLogin, userLogout } =
    useSocketContext();

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
      setToken(token);

      if (!username) {
        router.push("/create-username");
        return;
      }

      localStorage.setItem("username", username);
      setUsernameAuth(username);

      userLogin({ username });
      router.push("/");
    } catch (error) {
      notifyErrorMessage(toast, error);
    }
  };

  const logout = () => {
    router.push("/login");
    clearAuthenticatorData();
  };

  const clearAuthenticatorData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    setToken("");
    setUsernameAuth("");
    setUserInfo();
  };

  const loginWithAnonymously = async () => {
    signInAnonymously(auth)
      .then((data) => {
        const { user } = data ?? {};
        const { uid } = user ?? {};
        uid && setAnonymousInfo((prev) => ({ ...prev, ...user }));
      })
      .catch((e) => notifyErrorMessage(toast, e));
  };

  const handleRouteChange = (url) => {
    prevRoute.current = currentRoute.current;
    currentRoute.current = url;
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

    // on route change
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (token && usernameAuth && !isAuthnrPath) {
      setIsAuthenticationPage(false);
      verifyAccessToken();
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

  /**
   * Handle emit login/logout when refresh page
   */
  useEffect(() => {
    if (!socketClient?.id || !usernameAuth) return;
    userLogin({ username: usernameAuth });
  }, [socketClient?.id]);

  const authProvider = useMemo(
    () => ({
      anonymousInfo,
      login,
      logout,
      userInfo,
      usernameAuth,
      prevRoute: prevRoute.current,
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
      prevRoute,
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
