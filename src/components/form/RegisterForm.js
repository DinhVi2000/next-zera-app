import React, { memo } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputHook from "../custom/InputHook";

import { registerFormSchema } from "@/validators/register.validator";
import CheckBoxHook from "../custom/CheckBoxHook";
import Link from "next/link";

const RegisterForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(registerFormSchema),
    // mode: "onChange",
  });

  const onSubmit = () => {
    if (!isValid) return;
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

      {/* terms checkbox */}
      <div className="mb-6">
        <CheckBoxHook
          className="text-sm leading-none"
          control={control}
          name="term"
        >
          <p>
            I accept{" "}
            <Link href={"/terms"} className="text-violet-300" target={"_blank"}>
              Terms & Conditions{" "}
            </Link>
            and{" "}
            <Link
              href={"/policy"}
              className="text-violet-300"
              target={"_blank"}
            >
              Privacy
            </Link>
          </p>
        </CheckBoxHook>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-base rounded-[20px] bg-linear-violet-300 w-full py-3"
      >
        Register
      </button>
    </form>
  );
};

export default memo(RegisterForm);
