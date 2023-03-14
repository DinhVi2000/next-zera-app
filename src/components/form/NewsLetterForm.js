import { IconCheck } from "@/resources/icons";
import { newLetterFormSchema } from "@/validators/new-letter.validator";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import InputHook from "../custom/InputHook";

const NewsLetterForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    control,
  } = useForm({
    job: "",
    resolver: yupResolver(newLetterFormSchema),
    // mode: "onChange",
  });

  const onSubmit = async (formData) => {
    if (!isValid || isSubmitSuccessful) return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-white w-full max-w-[330px]">
        <p className="text-[28px] font-semibold mb-2.5">Newsletter</p>

        <InputHook
          name="name"
          id="name"
          control={control}
          placeholder="Enter your name"
          className="rounded-[10px] p-2 w-full mb-4 text-black"
        />

        <InputHook
          name="email"
          id="email"
          control={control}
          placeholder="Enter your email"
          className="rounded-[10px] p-2 w-full text-black"
        />
        <p className="text-pink-600 text-sm h-4 leading-6 mt-0.5 mb-2">
          {errors?.email?.message}
        </p>

        <button
          type="submit"
          className="rounded-[10px] w-[130px] h-9 px-[10px] py-[5px] flex-center border border-white text-base
                           transition-all hover:text-violet-400 hover:bg-white group"
        >
          {isSubmitSuccessful ? (
            <IconCheck className="w-5 h-5 text-white group-hover:text-violet-400" />
          ) : (
            "Subscribe now"
          )}
        </button>
      </div>
    </form>
  );
};

export default NewsLetterForm;
