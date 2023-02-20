/* eslint-disable no-console */
import { loginWithEmail } from "@/services/auth.service";
import { useToast } from "@chakra-ui/react";
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
  const toast = useToast();

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

  const handleLogin = async (formData) => {
    try {
      const data = await loginWithEmail(formData);
      if (!data.success) {
        throw new Error(data?.message);
      }

      const { token } = data;
      localStorage.setItem("accessToken", token);
      setToken(token);
      router.push("/");
    } catch (error) {
      toast({
        title: "ERROR",
        variant: "left-accent",
        description: error?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const authProvider = useMemo(
    () => ({
      userInfo,
      setUserInfo,
      token,
      setToken,
      handleLogin,
      handleLogout,
    }),
    [userInfo, setUserInfo, token, setToken]
  );

  return (
    <AuthContext.Provider value={{ authProvider }}>
      {children}
    </AuthContext.Provider>
  );
};
