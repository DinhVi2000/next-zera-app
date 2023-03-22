import React, { memo } from "react";

import {
  hasLeastOneLowercase,
  hasLeastOneNumber,
  hasLeastOneUppercase,
  inRange6to15,
} from "@/utils/regex";

const PasswordRules = ({ password }) => {
  const classByRegexRule = {
    true: "text-green-400",
    false: "text-pink-700",
  };

  return (
    <div className="py-5 flex flex-col">
      <span
        className={
          "transition-all duration-300 " +
          classByRegexRule[
            hasLeastOneLowercase.test(password) &&
              hasLeastOneUppercase.test(password)
          ]
        }
      >
        o Upper and lowercase letters
      </span>
      <span
        className={
          "transition-all duration-300 " +
          classByRegexRule[!!password && hasLeastOneNumber.test(password)]
        }
      >
        o At least 1 number
      </span>
      <span
        className={
          "transition-all duration-300 " +
          classByRegexRule[!!password && inRange6to15.test(password)]
        }
      >
        o Min 6 – max 15 characters
      </span>
    </div>
  );
};

export default memo(PasswordRules);
