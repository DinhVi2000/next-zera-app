import React, { memo } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputHook from "@/components/custom/InputHook";
import ButtonLoading from "@/components/loading/ButtonLoading";

import { STATUS } from "@/utils/constant";

import { forgotPasswordFormSchema } from "@/validators/forgot-password.validator";

import { useApi } from "@/hooks/useApi";

import { apiURL } from "@/utils/$apiUrl";
import { notifySuccessMessage } from "@/utils/helper";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { staticPaths } from "@/utils/$path";

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const { post, status } = useApi();
  const toast = useToast();

  const message = "Please check your email to reset password";

  const onSubmit = async (formData) => {
    if ([STATUS.IN_PROGRESS, STATUS.SUCCESS].includes(status) && !isValid)
      return;

    post(apiURL.post.forgot_password, formData).then((res) => {
      if (res) notifySuccessMessage(toast, message);
    });
  };

  return (
    <form
      className="text-white mt-5"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      {/* email field */}
      <div className="mb-[10px]">
        <div className="flex w-full justify-between">
          <label className="block" htmlFor="email">
            Email
          </label>
          <p className="text-pink-600 text-sm h-4 leading-6">
            {errors?.email?.message}
          </p>
        </div>
        <InputHook
          name="email"
          id="email"
          control={control}
          type="text"
          className="bg-violet-100 w-full rounded-[10px] px-3 py-3 text-black text-base"
        />
      </div>

      {/* button */}
      <button
        disabled={status === STATUS.SUCCESS}
        type="submit"
        className="mt-4 text-base rounded-[20px] bg-linear-violet-300 w-full py-3 flex items-center justify-center"
      >
        <ButtonLoading isLoading={status === STATUS.IN_PROGRESS} />
        Forgot password
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

export default memo(ForgotPasswordForm);
