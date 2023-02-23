/* eslint-disable @next/next/no-img-element */
import React from "react";
import ImageLoading from "../loading/ImageLoading";

const GameCategory = ({ id, area, size, description, thumbnail, ...props }) => {
  const gridArea = `${area} / ${area} / ${area} / ${area}`;

  return (
    <>
      {id < 9 && id > 0 ? (
        <div
          {...props}
          className={`rounded-2xl overflow-hidden relative cursor-pointer min-w-[204px] min-h-[204px]
                      hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 shadow-[0px_6px_12px_0px_rgb(0,0,0,0.24)]`}
          style={{ gridArea }}
        >
          {/* thumbnail */}
          <ImageLoading
            alt=""
            src={thumbnail}
            className="rounded-2xl w-full h-full object-cover"
          ></ImageLoading>
          {/* description */}
          <span className="bg-white text-violet-900 uppercase absolute w-full bottom-0 px-4 font-bold text-[13px] h-9 flex items-center">
            {description}
          </span>
        </div>
      ) : (
        <div
          {...props}
          className={`rounded-2xl overflow-hidden relative flex items-center bg-white cursor-pointer max-h-[94px]
                      hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 shadow-[0px_6px_12px_0px_rgb(0,0,0,0.24)]`}
          style={{ gridArea }}
        >
          {/* thumbnail */}
          <ImageLoading
            src={thumbnail}
            alt={description}
            className="min-w-[94px] h-[94px] object-cover"
          />
          {/* description */}
          <div className="text-violet-900 uppercase w-full px-2 font-bold text-sm h-9 flex items-center leading-5 cursor-pointer">
            {description}
          </div>
        </div>
      )}
    </>
  );
};

export default GameCategory;
