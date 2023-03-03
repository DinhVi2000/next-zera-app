/* eslint-disable @next/next/no-img-element */
import React from "react";

import {
  IconHeart,
  IconInfo,
  IconPlusNoRounded,
  IconZoomIn,
  IconZoomOut,
} from "@/resources/icons";

import ImageLoading from "@/components/loading/ImageLoading";

const GameScreenBar = ({
  title,
  thumbnail,
  onZoomInGameScreen,
  onZoomOutGameScreen,
  isFullScreen,
}) => {
  return (
    <div className="bg-[#373737] text-white p-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <ImageLoading
          src={thumbnail}
          alt=""
          className="w-[50px] h-[50px] rounded-xl object-cover"
        />
        <p className="w-[380px]">{title}</p>
      </div>

      <div className="flex gap-5">
        <div className="bg-[#5B5B5B] rounded-[10px] py-[5px] px-2.5 text-base">
          00 : 00 : 00
        </div>

        <div className="flex gap-2.5 items-center">
          <IconHeart className="cursor-pointer" />
          <IconPlusNoRounded className="cursor-pointer" />
          <span
            className="h-fit"
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
