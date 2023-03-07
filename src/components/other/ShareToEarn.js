import { getArea } from "@/utils/helper";
import React from "react";

const ShareToEarn = ({ area, ...props }) => {
  return (
    <div
      style={{ gridArea: getArea(area) }}
      className="bg-[#D9D9D9] text-black text-base font-bold w-full h-full flex items-center justify-center rounded-2xl mb-hidden"
      {...props}
    >
      Share to earn more coin
    </div>
  );
};

export default ShareToEarn;
