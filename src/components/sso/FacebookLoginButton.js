/* eslint-disable no-console */
import React, { memo } from "react";
import { useRouter } from "next/router";

import { IconLogoFacebook } from "@/resources/icons";

import { verifySSOToken } from "@/services/auth.service";

import { SSO_METHOD } from "@/utils/constant";

import ReactFacebookLogin from "react-facebook-login";

import { config } from "@/envs";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "@/context/auth-context";

const FacebookLoginButton = ({ onSetIsSSOLogging }) => {
  const { appId } = config["FACEBOOK"];

  const { setToken } = useAuthContext();

  const router = useRouter();
  const toast = useToast();

  const responseFacebook = async (response) => {
    if (!response) return;
    const { accessToken } = response;

    try {
      const res = await verifySSOToken({
        method: SSO_METHOD.FACEBOOK,
        token: accessToken,
      });
      if (!res) return;

      const { token } = res;

      setToken(token);
      localStorage.setItem("accessToken", token);

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
    <ReactFacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      scope="public_profile,email,user_friends"
      callback={responseFacebook}
      icon=<p className="flex-center gap-2">
        <IconLogoFacebook />
        <span className="mt-0.5 text-black">Continue with Facebook</span>
      </p>
      onClick={() => {
        onSetIsSSOLogging(true);
      }}
      textButton=""
      cssClass="bg-white text-black text-white py-2 px-[14px] w-full rounded-[20px] p-2 text-sm flex justify-center items-center gap-2 w-full"
    />
  );
};

export default memo(FacebookLoginButton);
