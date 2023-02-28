import { GAMES_IMAGES } from "@/utils/constant";
import { getRandom } from "@/utils/helper";
import React from "react";
import { useSelector } from "react-redux";
import GameItem from "../game/GameItem";

const GameCategoryDetailGrid = () => {
  const { categoryDetail } = useSelector(({ game }) => game) ?? {};

  return (
    <div className="grid-category-detail">
      <div
        style={{
          gridArea: "ct / ct / ct / ct",
          background:
            "linear-gradient(180deg, #C4B5FD 0%, #979BFF 0.01%, #EF36C6 100%)",
        }}
        className="text-white min-h-[94px] rounded-2xl flex items-center justify-center text-lg font-bold"
      >
        App Store games
      </div>

      {/* game */}
      {Array(10)
        .fill(0)
        ?.map((e, i) => (
          <GameItem
            key={i}
            style={{
              gridArea: `g${i + 1} / g${i + 1} / g${i + 1} / g${i + 1}`,
            }}
          />
        ))}

      {/* {Array(10)
        .fill(0)
        ?.map((e, i) => (
          <div
            key={i}
            style={{
              gridRowStart: "span 2",
              gridColumnStart: "span 2",
            }}
            className="bg-white min-h-[94px] rounded-2xl"
          ></div>
        ))} */}
    </div>
  );
};

export default GameCategoryDetailGrid;
