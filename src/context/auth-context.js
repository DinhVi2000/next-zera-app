/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { loginWithEmail } from "@/services/auth.service";
import { getUserInfo, getUserIp } from "@/services/user.service";
import { notifyErrorMessage } from "@/utils/helper";

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PUBLIC_PAGE_URL, STATUS } from "@/utils/constant";
import Script from "next/script";
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

  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState();
  const [usernameAuth, setUsernameAuth] = useState();
  const [isAuthenticationPage, setIsAuthenticationPage] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState(STATUS.NOT_START);

  const { pathname } = router ?? {};

  const verifyAccessToken = async () => {
    // getUserIp().then((res) => console.log("res :", res));
    try {
      setVerifyStatus(STATUS.IN_PROGRESS);
      const { data } = await getUserInfo(usernameAuth);

      setUserInfo(data);
      setVerifyStatus(STATUS.SUCCESS);
    } catch (error) {
      notifyErrorMessage(toast, error);
      setVerifyStatus(STATUS.FAIL);
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    setToken("");

    router.push("/login");
  };

  const loginWithAnonymously = async () => {
    try {
      const { user } = (await signInAnonymously(auth)) ?? {};
      const { uid } = user ?? {};

      if (uid) console.log("uid", uid);
    } catch (error) {
      notifyErrorMessage(error);
    }
  };

  const authProvider = useMemo(
    () => ({
      usernameAuth,
      userInfo,
      token,
      setUserInfo,
      setToken,
      setUsernameAuth,
      login,
      logout,
      verifyStatus,
      setVerifyStatus,
    }),
    [userInfo, setUserInfo, token, setToken, verifyStatus, setVerifyStatus]
  );

  const isAuthenticationPath = useMemo(
    () => Object.values(PUBLIC_PAGE_URL).includes(pathname),
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
    if (token && usernameAuth && !isAuthenticationPath) {
      setIsAuthenticationPage(false);
      verifyAccessToken();
    }
  }, [token, usernameAuth, pathname]);

  useEffect(() => {
    if (
      pathname &&
      isAuthenticationPath &&
      (localStorage.getItem("accessToken") || localStorage.getItem("username"))
    ) {
      router.push("/");
    } else {
      setIsAuthenticationPage(false);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ authProvider }}>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></Script>
      {!isAuthenticationPage && children}
    </AuthContext.Provider>
  );
};
