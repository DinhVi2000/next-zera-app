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

  useEffect(() => {
    setToken(localStorage.getItem("accessToken") || "");
    setUsernameAuth(localStorage.getItem("username") || "");
  }, []);

  useEffect(() => {
    const isPublicPage = Object.values(PUBLIC_PAGE_URL).includes(pathname);
    if (token && usernameAuth && !isPublicPage) {
      console.log("authenticate with token: ", token);
      console.log("authenticate with username: ", usernameAuth);
      verifyAccessToken();
    }
  }, [token, usernameAuth, pathname]);

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

  return (
    <AuthContext.Provider value={{ authProvider }}>
      {children}
    </AuthContext.Provider>
  );
};
