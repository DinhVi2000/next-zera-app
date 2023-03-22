import React, { memo, useEffect, useState } from "react";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputHook from "../custom/InputHook";

import { registerFormSchema } from "@/validators/register.validator";
import CheckBoxHook from "../custom/CheckBoxHook";
import Link from "next/link";
import { registerEmail } from "@/services/auth.service";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import ButtonLoading from "../loading/ButtonLoading";
import { notifyErrorMessage, notifySuccessMessage } from "@/utils/helper";
import { STATUS } from "@/utils/constant";
import { staticPaths } from "@/utils/$path";
import PasswordRules from "../other/PasswordRules";

const RegisterForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const term = useWatch({
    control,
    name: "term",
  });

  const passwordWacth = useWatch({
    control,
    name: "password",
  });

  const [status, setStatus] = useState(STATUS.NOT_START);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [checkPassword, setCheckPassword] = useState(errors?.password?.message);

  const onSubmit = async (dataUser) => {
    if (status === STATUS.IN_PROGRESS || status === STATUS.SUCCESS) return;
    setIsLoading(true);

    if (!isValid) return;
    setStatus(STATUS.IN_PROGRESS);

    try {
      const formData = {
        email: dataUser.email,
        password: dataUser.password,
      };
      if (router.query?.src) {
        formData.aff_sender = router.query?.src;
      }
      const data = await registerEmail(formData);
      if (!data) return;
      setStatus(STATUS.SUCCESS);
      notifySuccessMessage(toast, "Please check your email!");
      setIsLoading(false);
    } catch (e) {
      setStatus(STATUS.FAIL);
      setIsLoading(false);
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    setCheckPassword(errors?.password?.message);
  }, [errors?.password?.message]);

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

      {/* password field */}
      <div className="mb-[0px]">
        <div className="flex w-full justify-between">
          <label className="block" htmlFor="email">
            Password
          </label>
          {checkPassword?.includes("Please enter your password") && (
            <p className="text-pink-600 text-sm h-4 leading-6">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <InputHook
          name="password"
          id="password"
          control={control}
          type="password"
          className="bg-violet-100 w-full rounded-[10px] px-3 py-3 text-black text-base"
        />
      </div>

      <PasswordRules password={passwordWacth} />

      {/* terms checkbox */}
      <div className="mb-6">
        <CheckBoxHook
          className="text-sm leading-none"
          control={control}
          name="term"
        >
          <p>
            I accept{" "}
            <Link
              href={staticPaths.term}
              className="text-violet-300"
              target={"_blank"}
            >
              Terms & Conditions{" "}
            </Link>
            and{" "}
            <Link
              href={staticPaths.policy}
              className="text-violet-300"
              target={"_blank"}
            >
              Privacy
            </Link>
          </p>
        </CheckBoxHook>
      </div>

      <button
        disabled={!term || isLoading}
        type="submit"
        className="text-base rounded-[20px] bg-linear-violet-300 w-full py-3 flex items-center justify-center"
      >
        <ButtonLoading isLoading={isLoading} />
        Register
      </button>
    </form>
  );
};

export default memo(RegisterForm);
