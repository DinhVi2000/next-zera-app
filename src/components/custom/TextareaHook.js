import React from "react";
import { useController } from "react-hook-form";

const TextareaHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });

  return (
    <textarea
      type="text"
      className="p-4 w-full border border-gray-100 rounded-lg bg-white outline-none focus:border-blue-500 transition-all"
      {...field}
      {...props}
    />
  );
};

export default TextareaHook;
