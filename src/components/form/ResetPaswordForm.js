import React, { memo } from "react";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputHook from "../custom/InputHook";

import { useRouter } from "next/router";
import ButtonLoading from "../loading/ButtonLoading";
import { resetPasswordFormSchema } from "@/validators/reset-password.validator";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";
import { STATUS } from "@/utils/constant";
import { notifySuccessMessage } from "@/utils/helper";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { staticPaths } from "@/utils/$path";
import {
  hasLeastOneLowercase,
  hasLeastOneNumber,
  hasLeastOneUppercase,
  inRange6to15,
} from "@/utils/regex";
import Rules from "../other/Rules";

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const passwordWatch = useWatch({
    control,
    name: "password",
  });

  const { post, status } = useApi();
  const toast = useToast();
  const router = useRouter();

  const { query } = router ?? {};
  const { token } = query ?? {};

  const message = "Your password has been changed successfully";

  const rules = [
    {
      label: "o Upper and lowercase letters",
      regex: [hasLeastOneLowercase, hasLeastOneUppercase],
    },
    {
      label: "o At least 1 number",
      regex: [hasLeastOneNumber],
    },
    {
      label: "o Min 6 – max 15 characters",
      regex: [inRange6to15],
    },
  ];

  const onSubmit = async (data) => {
    if (!isValid) return;
    const { password } = data;

    post(apiURL.post.new_password, { password, token }).then(() => {
      notifySuccessMessage(toast, message);
      router.push(staticPaths.login);
    });
  };

  return (
    <form
      className="text-white mt-5"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      {/* password field */}
      <div className="">
        <div className="flex w-full justify-between">
          <label className="block" htmlFor="email">
            New password
          </label>
          <p className="text-pink-600 text-sm h-4 leading-6">
            {errors?.password?.message}
          </p>
        </div>
        <InputHook
          name="password"
          id="password"
          control={control}
          type="password"
          className="bg-violet-100 w-full rounded-[10px] px-3 py-3 text-black text-base"
        />
      </div>

      <Rules field={passwordWatch} rules={rules} />

      {/* confirm password field */}
      <div className="mb-5">
        <div className="flex w-full justify-between">
          <label className="block" htmlFor="email">
            Confirm password
          </label>
          <p className="text-pink-600 text-sm h-4 leading-6">
            {errors?.rePassword?.message}
          </p>
        </div>
        <InputHook
          name="rePassword"
          id="rePassword"
          control={control}
          type="password"
          className="bg-violet-100 w-full rounded-[10px] px-3 py-3 text-black text-base"
        />
      </div>

      <button
        type="submit"
        disabled={status === STATUS.IN_PROGRESS}
        className="text-base rounded-[20px] bg-linear-violet-300 w-full py-3 flex items-center justify-center"
      >
        <ButtonLoading isLoading={status === STATUS.IN_PROGRESS} />
        Reset password
      </button>

      <div className="text-white text-center mt-4">
        Already registered?
        <Link className="ml-1 text-violet-300" href={staticPaths.login}>
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default memo(ResetPasswordForm);
