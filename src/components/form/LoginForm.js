import React, { memo } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputHook from "../custom/InputHook";

import { registerFormSchema } from "@/validators/register.validator";

import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import { staticPaths } from "@/utils/$path";

const LoginForm = ({ onSetIsSSOLogging }) => {
  const { login } = useAuthContext();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    job: "",
    resolver: yupResolver(registerFormSchema),
    // mode: "onChange",
  });

  const onSubmit = async (formData) => {
    if (!isValid) return;
    onSetIsSSOLogging(true);
    await login(formData);
    onSetIsSSOLogging(false);
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
          <p className="text-pink-600 text-sm h-4 leading-6 mt-0.5 mb-2">
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

      {/* password field */}
      <div className="mb-[10px]">
        <div className="flex w-full justify-between">
          <label className="block" htmlFor="email">
            Password
          </label>
          <p className="text-pink-600 text-sm h-4 leading-6 mt-0.5 mb-2">
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

      <div className="mb-5 text-right">
        <Link href={staticPaths.forgot_password} className="text-violet-300">
          Forgot the password ?
        </Link>
      </div>

      <button
        type="submit"
        className="text-base rounded-[20px] bg-linear-violet-300 w-full py-3"
      >
        Login
      </button>
    </form>
  );
};

export default memo(LoginForm);
