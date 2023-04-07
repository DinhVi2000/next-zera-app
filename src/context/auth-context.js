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
import {
  getPurchaseHistory,
  getUserInfo,
  getUserIp,
} from "@/services/user.service";
import {
  getGameRecentlyPlayed,
  getMostPlayed,
  getAllPlaylist,
  getLovedGames,
} from "@/services/game.service";

import { notifyErrorMessage } from "@/utils/helper";

import { useToast } from "@chakra-ui/react";

import { useRouter } from "next/router";

import {
  ERROR_PAGES,
  PRIVATE_PAGE_URL,
  PUBLIC_PAGE_URL,
  STATUS,
} from "@/utils/constant";

import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";
import Script from "next/script";

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
  {
    key: "lovedGame",
    callback: getLovedGames,
  },
];

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const { get } = useApi();

  const [userInfo, setUserInfo] = useState();
  const [activitiesInfo, setActivitiesInfo] = useState();
  const [anonymousInfo, setAnonymousInfo] = useState();
  const [token, setToken] = useState();
  const [usernameAuth, setUsernameAuth] = useState();

  const [isAuthenticationPage, setIsAuthenticationPage] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState(STATUS.NOT_START);
  const [tokenTemp, setTokenTemp] = useState();

  const prevRoute = useRef();
  const currentRoute = useRef();

  const { pathname } = router ?? {};

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

  const getActivities = () => {
    try {
      userInfoFunctions.map(({ key, callback }) =>
        callback()
          .then((data) =>
            setActivitiesInfo((prev) => {
              if (!prev) prev = {};
              prev[key] = data;
              return { ...prev };
            })
          )
          .catch((e) => {
            throw e;
          })
      );
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  const verifyAccessToken = async () => {
    try {
      handleSetUserInfo();
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

      if (!username) {
        setTokenTemp(token);
        router.push("/create-username");
        return;
      }

      localStorage.setItem("accessToken", token);
      setToken(token);

      localStorage.setItem("username", username);
      setUsernameAuth(username);

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
    setAnonymousInfo();
    setUserInfo();
  };

  const loginWithAnonymously = async () => {
    // signInAnonymously(auth)
    getUserIp()
      .then((data) => {
        // const { user } = data ?? {};
        // const { uid } = user ?? {};

        const uid = data?.ipAddress;
        uid && setAnonymousInfo((prev) => ({ ...prev, uid }));

        return get(apiURL.get.get_anonymous_info(uid));
      })
      .then((data) => {
        setAnonymousInfo((prev) => ({ ...prev, ...data }));
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

  const isNotFoundPath = useMemo(
    () => Object.values(ERROR_PAGES).includes(pathname),
    [pathname]
  );

  const isPrivatePath = useMemo(
    () => Object.values(PRIVATE_PAGE_URL).includes(pathname),
    [pathname]
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");

    if ((!accessToken || !username) && !isAuthnrPath) loginWithAnonymously();

    setToken(accessToken || "");
    setUsernameAuth(username || "");

    // on route change
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (token && usernameAuth && !isAuthnrPath && !isNotFoundPath) {
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

  const authProvider = useMemo(
    () => ({
      anonymousInfo,
      login,
      logout,
      clearAuthenticatorData,
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
      setActivitiesInfo,
      activitiesInfo,
      getActivities,
      tokenTemp,
      setTokenTemp,
    }),
    [
      anonymousInfo,
      login,
      logout,
      clearAuthenticatorData,
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
      tokenTemp,
      setTokenTemp,
    ]
  );

  return (
    <AuthContext.Provider value={{ authProvider }}>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
      {!isAuthenticationPage && children}
    </AuthContext.Provider>
  );
};
