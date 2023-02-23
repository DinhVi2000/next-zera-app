import React from "react";
import ImageLoading from "../loading/ImageLoading";

const Ads = ({ area, ...props }) => {
  return (
    <div
      className="min-h-[94px] w-full h-full bg-[#D9D9D9] rounded-2xl flex items-center justify-center text-lg relative overflow-hidden cursor-pointer"
      style={{
        gridArea: `${area} / ${area} / ${area} / ${area}`,
      }}
    >
      <ImageLoading
        src={
          "https://assets.grab.com/wp-content/uploads/sites/11/2021/01/25114140/cropped-GrabAds-Logo-1200pxWx630pxH-02.png"
        }
        className="w-full h-full object-cover"
        alt=""
      />
    </div>
  );
};

export default Ads;
