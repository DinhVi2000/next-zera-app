/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { loginWithEmail } from "@/services/auth.service";
import { getUserInfo } from "@/services/user.service";
import { notifyErrorMessage } from "@/utils/helper";

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PUBLIC_PAGE_URL } from "@/utils/constant";

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

  const { pathname } = router ?? {};

  const verifyAccessToken = async () => {
    try {
      const { data } = await getUserInfo(usernameAuth);

      setUserInfo(data);
    } catch (error) {
      notifyErrorMessage(toast, error);
    }
  };

  const login = async (formData) => {
    try {
      const {
        data: { token, username },
      } = await loginWithEmail(formData);

      localStorage.setItem("accessToken", token);
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
    }),
    [userInfo, setUserInfo, token, setToken]
  );

  const isAuthenticationPath = useMemo(
    () => Object.values(PUBLIC_PAGE_URL).includes(pathname),
    [pathname]
  );

  useEffect(() => {
    setToken(localStorage.getItem("accessToken") || "");
    setUsernameAuth(localStorage.getItem("username") || "");
  }, []);

  useEffect(() => {
    if (token && usernameAuth && !isAuthenticationPath) {
      setIsAuthenticationPage(false);

      console.log("authenticate with token: ", token);
      console.log("authenticate with username: ", usernameAuth);

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
      {!isAuthenticationPage && children}
    </AuthContext.Provider>
  );
};
