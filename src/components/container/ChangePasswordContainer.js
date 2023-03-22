import React, { memo } from "react";

const ChangePasswordContainer = ({ title, children }) => {
  return (
    <div className="flex-center min-h-[100vh] ">
      <div
        className="bg-[#000000b3] rounded-[30px] px-[60px] pt-5 pb-12 relative overflow-hidden
                 w-[580px] max-[600px]:px-6 max-[600px]:w-[400px] max-[480px]:w-[350px]"
      >
        <h2 className="text-white text-[26px] text-center font-bold">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default memo(ChangePasswordContainer);
