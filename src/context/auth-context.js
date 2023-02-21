/* eslint-disable no-console */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { loginWithEmail } from "@/services/auth.service";
import { getUserInfo } from "@/services/user.service";
import { notifyErrorMessage } from "@/utils/helper";

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

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

  const [userInfo, setUserInfo] = useState("user");
  const [token, setToken] = useState();

  const verifyAccessToken = async () => {
    try {
      const response = await getUserInfo();
      if (!response.success) {
        throw new Error(response?.message);
      }

      const { data } = response;
      setUserInfo(data);
    } catch (error) {
      notifyErrorMessage(toast, error);
    }
  };

  const login = async (formData) => {
    try {
      const response = await loginWithEmail(formData);
      if (!response.success) {
        throw new Error(response?.message);
      }

      const {
        data: { token },
      } = response;
      localStorage.setItem("accessToken", token);
      setToken(token);
      router.push("/");
    } catch (error) {
      notifyErrorMessage(toast, error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("accessToken") || "");
  }, []);

  useEffect(() => {
    if (token) {
      console.log("authenticate with token", token);
      verifyAccessToken();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken("");
    router.push("/login");
  };

  const authProvider = useMemo(
    () => ({
      userInfo,
      setUserInfo,
      token,
      setToken,
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
