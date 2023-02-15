/* eslint-disable @next/next/no-img-element */
import React from "react";

import { IconRecently } from "@/resources/icons";
import { IMAGE_URL } from "@/utils/constant";

const TileSize = {
  1: "h-[94px] w-[94px]",
  4: "h-[204px] w-[204px]",
  9: "h-[314px] w-[314px]",
};

const GameTile = ({ size, isRecently, ...props }) => {
  return (
    <div
      className={`relative rounded-2xl cursor-pointer select-none group ${TileSize[size]} 
                  hover:translate-y-[-2px] hover:scale-105 transition-all hover:shadow-xl`}
      {...props}
    >
      {isRecently && (
        <span className="absolute top-4 left-[-2px] z-100">
          <IconRecently></IconRecently>
        </span>
      )}

      <img
        alt=""
        src={IMAGE_URL}
        className="w-full h-full object-cover rounded-2xl"
      ></img>
      <div
        className="absolute text-white bottom-0 text-center w-full font-bold opacity-0 translate-y-0
                   group-hover:opacity-100 group-hover:translate-y-[-8px] transition-all duration-300"
      >
        Games
      </div>
    </div>
  );
};

export default GameTile;
