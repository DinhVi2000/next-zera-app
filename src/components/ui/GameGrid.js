import React, { memo } from "react";

import GameItem from "@/components/game/GameItem";
import Games from "@/api/games.json";
import { useSelector } from "react-redux";

const GameGrid = ({ games }) => {
  return (
    <>
      <div className="game-grid">
        {/* {Array(30)
          .fill(0)
          .map((e, i) => (
            <GameItem key={i} size={1}></GameItem>
          ))} */}
        {games?.map((e, i) => (
          <GameItem
            key={e?.id}
            id={e?.id}
            area={`ip${e?.id}`}
            thumbnail={e?.thumbnail}
            title={e?.title}
          ></GameItem>
        ))}
      </div>
    </>
  );
};

export default memo(GameGrid);
