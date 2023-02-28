import React, { memo, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputHook from "../custom/InputHook";

import { useAuthContext } from "@/context/auth-context";
import { useApi } from "@/hooks/useApi";
import { updateUsername } from "@/services/user.service";
import ButtonLoading from "../loading/ButtonLoading";
import { notifyErrorMessage } from "@/utils/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createUsernameFormSchema } from "@/validators/create-username.validator";

const CreateUsernameForm = () => {
  const { login, setUsernameAuth } = useAuthContext();

  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    job: "",
    resolver: yupResolver(createUsernameFormSchema),
  });

  const onSubmit = async (formData) => {
    if (!isValid) return;

    try {
      setIsLoading(true);

      const response = await updateUsername(formData);
      if (!response.success) {
        throw new Error(response?.message);
      }

      const { username } = formData ?? {};

      setUsernameAuth(username);

      router.push("/");
    } catch (error) {
      notifyErrorMessage(toast, error);
      setIsLoading(false);
    }
  };

  return (
    <form
      className="text-white mt-5"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      {/* username field */}
      <div>
        <div className="flex w-full justify-between">
          <label className="block" htmlFor="username">
            Username
          </label>
          <p className="text-pink-600 text-sm h-4 leading-6 mt-0.5 mb-2">
            {errors?.username?.message}
          </p>
        </div>
        <InputHook
          role="presentation"
          autoComplete="new-password"
          name="username"
          id="username"
          control={control}
          type="text"
          className="bg-violet-100 w-full rounded-[10px] px-3 py-3 text-black text-base"
        />
      </div>

      {/* rules */}
      <div className="py-5 text-pink-700">
        o Lowercased
        <br /> o Accepts numbers, letters, and underscores
        <br />o Min 5 – max 64 characters
      </div>

      <button
        disabled={errors?.username?.message || isLoading}
        type="submit"
        className="text-base rounded-[20px] bg-linear-violet-300 w-full py-3 flex items-center justify-center"
      >
        <ButtonLoading isLoading={isLoading} />
        Create
      </button>
    </form>
  );
};

export default memo(CreateUsernameForm);
