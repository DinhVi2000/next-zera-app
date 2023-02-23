import React, { memo } from "react";
/* eslint-disable no-console */
import { auth, google } from "@/configs/firebaseConfig";

import { verifySSOToken } from "@/services/auth.service";

import { SSO_METHOD } from "@/utils/constant";

import { signInWithPopup } from "firebase/auth";

import Image from "next/image";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "@/context/auth-context";

const GoogleLoginButton = ({ onSetIsSSOLogging }) => {
  const router = useRouter();
  const toast = useToast();

  const { setToken, setUsernameAuth } = useAuthContext();

  const handleLoginWithGoogle = async () => {
    try {
      onSetIsSSOLogging(true);

      const signInGoogleResponse = await signInWithPopup(auth, google);
      if (!signInGoogleResponse) return;
      const {
        _tokenResponse: { oauthIdToken },
      } = signInGoogleResponse;

      const res = await verifySSOToken({
        method: SSO_METHOD.GOOGLE,
        token: oauthIdToken,
      });

      const {
        data: { token, username },
      } = res;

      setToken(token);
      setUsernameAuth(username);

      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", username);

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
      onSetIsSSOLogging(false);
    }
  };

  return (
    <button
      className="bg-white text-black p-2 w-full rounded-[20px]"
      onClick={handleLoginWithGoogle}
    >
      <div className="flex justify-center items-center gap-1">
        <Image
          className="mr-1"
          src="https://cdn6.agoda.net/images/universal-login/google-logo-v2.svg"
          alt=""
          width={20}
          height={20}
        />
        <span className="text-sm font-medium leading-none mt-0.5">
          Continue with Google
        </span>
      </div>
    </button>
  );
};

export default memo(GoogleLoginButton);
