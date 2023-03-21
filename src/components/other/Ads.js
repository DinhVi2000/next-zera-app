import { getArea } from "@/utils/helper";
import React from "react";
import ImageLoading from "../loading/ImageLoading";

const Ads = ({ area, thumbnail, className, ...props }) => {
  return (
    <div
      className={`${className} min-h-[94px] w-full h-full bg-[#D9D9D9] rounded-2xl flex items-center justify-center text-lg relative overflow-hidden cursor-pointer`}
      style={{
        gridArea: getArea(area),
      }}
      {...props}
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
