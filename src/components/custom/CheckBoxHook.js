import React from "react";
import { useController } from "react-hook-form";

const CheckBoxHook = ({ control, children, ...props }) => {
  const { field } = useController({ control, name: props.name });
  return (
    <label className="rounded-full bg-white cursor-pointer custom-checkbox">
      <input
        type="checkbox"
        {...field}
        {...props}
        className="hidden"
        id={props.name}
      />
      <div className="flex items-center gap-x-3">
        <div className="w-full h-full rounded-md bg-white custom-checkbox-square flex justify-center items-center transition-all">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7453 1.89733L3.93178 9.71087L0.254822 6.03391L1.17132 5.11741L3.93178 7.87137L10.8288 0.980835L11.7453 1.89733Z"
              fill="white"
            />
          </svg>
        </div>
        <label
          className="text-sm cursor-pointer"
          htmlFor={props.name}
          id={props.name}
        >
          {children}
        </label>
      </div>
    </label>
  );
};

export default CheckBoxHook;
