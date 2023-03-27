import { postNewsletter } from "@/services/user.service";
import { notifyErrorMessage, notifySuccessMessage } from "@/utils/helper";
import { newLetterFormSchema } from "@/validators/new-letter.validator";
import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputHook from "../custom/InputHook";

const NewsLetterForm = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    job: "",
    resolver: yupResolver(newLetterFormSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    if (!isValid) return;
    try {
      const data = await postNewsletter(formData);

      if (data.success) {
        setLoading(false);
        reset();
        notifySuccessMessage(toast, "You have successfully subscribed");
      }
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-white w-[300px]">
        <p className="text-[28px] font-semibold">Newsletter</p>

        <p className="text-pink-600 mb-2 text-sm h-4 leading-6">
          {errors?.name?.message}
        </p>
        <InputHook
          name="name"
          id="name"
          control={control}
          placeholder="Enter your name"
          className="rounded-[10px] p-2 w-full text-black"
        />

        <p className="text-pink-600 mb-2 text-sm h-4 leading-6">
          {errors?.email?.message}
        </p>
        <InputHook
          name="email"
          id="email"
          control={control}
          placeholder="Enter your email"
          className="rounded-[10px] p-2 w-full text-black"
        />

        <button
          disabled={loading}
          type="submit"
          className={`mt-3 rounded-[10px] w-[130px] h-9 px-[10px] py-[5px] flex-center border border-white text-base
                          transition-all ${
                            loading
                              ? ""
                              : "hover:text-violet-400 hover:bg-white "
                          }`}
        >
          Subscribe now
        </button>
      </div>
    </form>
  );
};

export default NewsLetterForm;
