/* eslint-disable no-console */
import React, { memo } from "react";
import { useRouter } from "next/router";

import { IconLogoFacebook } from "@/resources/icons";

import { verifySSOToken } from "@/services/auth.service";

import { SSO_METHOD } from "@/utils/constant";

import ReactFacebookLogin from "react-facebook-login";

import { config } from "@/envs";

const FacebookLoginButton = ({ onSetIsSSOLogging }) => {
  const { appId } = config["FACEBOOK"];
  const router = useRouter();

  const responseFacebook = async (response) => {
    if (!response) return;
    const { accessToken } = response;

    try {
      const data = await verifySSOToken({
        method: SSO_METHOD.FACEBOOK,
        token: accessToken,
      });
      if (!data) return;

      router.push("/");
    } catch (error) {
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
