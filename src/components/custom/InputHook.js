import { IconHiddenEye, IconShowEye } from "@/resources/icons";
import React, { useState } from "react";
import { useController } from "react-hook-form";

const InputHook = ({ control, type, ...props }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });

  return (
    <div className="relative">
      <input
        type={type === "password" && !passwordShown ? "password" : "text"}
        className="p-4 w-full border border-gray-100 rounded-lg bg-white outline-none focus:border-blue-500 transition-all"
        {...field}
        {...props}
      />
      {type === "password" && (
        <div
          className="absolute top-[29%] right-[2%] cursor-pointer"
          onClick={() => setPasswordShown((value) => !value)}
        >
          {passwordShown ? <IconHiddenEye /> : <IconShowEye />}
        </div>
      )}
    </div>
  );
};

export default InputHook;
