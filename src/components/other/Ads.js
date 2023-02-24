import React from "react";
import ImageLoading from "../loading/ImageLoading";

const Ads = ({ area, thumbnail, ...props }) => {
  return (
    <div
      className="min-h-[94px] w-full h-full bg-[#D9D9D9] rounded-2xl flex items-center justify-center text-lg relative overflow-hidden cursor-pointer"
      style={{
        gridArea: `${area} / ${area} / ${area} / ${area}`,
      }}
    >
      <ImageLoading
        src={thumbnail}
        className="w-full h-full object-cover"
        alt=""
      />
    </div>
  );
};

export default Ads;
