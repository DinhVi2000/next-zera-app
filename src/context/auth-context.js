/* eslint-disable no-console */
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

  const [userInfo, setUserInfo] = useState("user");
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("accessToken") || "");
  }, []);

  useEffect(() => {
    if (token) {
      console.log("authenticate with token", token);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken("");
    router.push("/login");
  };

  const authProvider = useMemo(
    () => ({ userInfo, setUserInfo, token, setToken, handleLogout }),
    [userInfo, setUserInfo, token, setToken]
  );

  return (
    <AuthContext.Provider value={{ authProvider }}>
      {children}
    </AuthContext.Provider>
  );
};
