import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";
import React from "react";

const GameTile = () => {
  return (
    <div className="w-[94px] h-[94px] rounded-2xl overflow-hidden">
      <Image alt="" src={IMAGE_URL}></Image>
    </div>
  );
};

export default GameTile;
