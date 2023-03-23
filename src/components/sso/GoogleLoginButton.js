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
import { notifyErrorMessage } from "@/utils/helper";
import { useSocketContext } from "@/context/socket-context";

const GoogleLoginButton = ({ onSetIsSSOLogging }) => {
  const router = useRouter();
  const toast = useToast();

  const { setToken, setUsernameAuth } = useAuthContext();
  const { userLogin } = useSocketContext();

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
      } = res ?? {};

      if (token) {
        setToken(token);
        localStorage.setItem("accessToken", token);
      }

      if (username) {
        setUsernameAuth(username);
        localStorage.setItem("username", username);
        userLogin({ username });
      }

      if (!username) return router.push("/create-username");
      router.push("/");
    } catch (error) {
      notifyErrorMessage(toast, error);
      onSetIsSSOLogging(false);
    }
  };

  return (
    <button
      className="bg-white text-black p-2 w-full rounded-[20px] h-10"
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
