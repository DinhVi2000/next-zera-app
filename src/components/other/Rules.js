import React, { memo } from "react";

const Rules = ({ field, rules }) => {
  const classByRegexRule = {
    true: "text-green-400",
    false: "text-pink-700",
  };

  const checkRegex = (regexs) => {
    let check = false;
    regexs.forEach((e, i) => {
      if (field && !!e.test(field) && i === regexs.length - 1) {
        check = true;
      }
    });
    return check;
  };

  return (
    <div className="py-5 flex flex-col">
      {rules?.map(({ label, regex }, i) => (
        <span
          key={i}
          className={
            "transition-all duration-300 " + classByRegexRule[checkRegex(regex)]
          }
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default memo(Rules);
