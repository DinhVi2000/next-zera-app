import React from "react";

const Ads = ({ area, ...props }) => {
  return (
    <div
      className="min-h-[94px] w-full h-full bg-[#D9D9D9] rounded-2xl flex items-center justify-center text-lg"
      style={{
        gridArea: `${area} / ${area} / ${area} / ${area}`,
      }}
    >
      ads
    </div>
  );
};

export default Ads;
