/* eslint-disable @next/next/no-img-element */
import {
  IconFullScreen,
  IconHeart,
  IconInfo,
  IconPlus,
  IconPlusNoRounded,
} from "@/resources/icons";
import React from "react";

const GameScreenBar = ({ title, thumbnail }) => {
  return (
    <div className="bg-[#373737] text-white py-2 px-4 flex items-center justify-between rounded-b-2xl">
      <div className="flex items-center gap-2.5">
        <img
          src={thumbnail}
          alt=""
          className="w-[50px] h-[50px] rounded-xl object-cover"
        />
        <p>{title}</p>
      </div>

      <div className="flex gap-5">
        <div className="bg-[#5B5B5B] rounded-[10px] py-[5px] px-2.5 text-base">
          00 : 00 : 00
        </div>

        <div className="flex gap-2.5">
          <IconHeart />
          <IconPlusNoRounded />
          <IconFullScreen />
          <IconInfo />
        </div>
      </div>
    </div>
  );
};

export default GameScreenBar;
