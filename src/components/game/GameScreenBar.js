/* eslint-disable @next/next/no-img-element */
import {
  IconHeart,
  IconInfo,
  IconPlusNoRounded,
  IconZoomIn,
  IconZoomOut,
} from "@/resources/icons";
import React, { useState } from "react";
import ImageLoading from "@/components/loading/ImageLoading";
import { getArea } from "@/utils/helper";

const GameScreenBar = ({
  area,
  title,
  thumbnail,
  onZoomInGameScreen,
  onZoomOutGameScreen,
  isFullScreen,
  className,
  ...props
}) => {
  return (
    <div
      style={{ gridArea: getArea(area) }}
      className={`${className} bg-[#373737] text-white py-2.5 px-5 flex items-center justify-between `}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <ImageLoading
          src={thumbnail}
          alt=""
          className="w-[50px] h-[50px] rounded-xl object-cover mb-hidden"
        />
        <div className="flex-1">{title}</div>
      </div>

      <div className="flex gap-5 justify-between max-[550px]:w-full">
        <div className="bg-[#5B5B5B] rounded-[10px] py-[5px] px-2.5 text-base">
          00 : 00 : 00
        </div>

        <div className="flex gap-2.5 items-center">
          <IconHeart className="cursor-pointer" />
          <IconPlusNoRounded className="cursor-pointer" />
          <span
            className="h-fit mb-hidden"
            onClick={isFullScreen ? onZoomOutGameScreen : onZoomInGameScreen}
          >
            {isFullScreen ? (
              <IconZoomOut className="cursor-pointer w-7 h-7 text-[#929292]" />
            ) : (
              <IconZoomIn className="cursor-pointer w-8 h-8 text-[#929292]" />
            )}
          </span>
          <IconInfo className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default GameScreenBar;
