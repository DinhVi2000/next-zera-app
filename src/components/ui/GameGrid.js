import React, { memo } from "react";

import GameTile from "@/components/game/GameTile";
import Games from "@/api/games.json";
import Script from "next/script";

const GameGrid = () => {
  return (
    <>
      <div className="game-grid">
        {Array(30)
          .fill(0)
          .map((e, i) => (
            <GameTile key={i} size={1}></GameTile>
          ))}
        {Games.map((e, i) => (
          <GameTile
            size={e?.size}
            key={i}
            style={{
              gridArea: `ip${e?.ip} / ip${e?.ip} / ip${e?.ip} / ip${e?.ip}`,
            }}
            ip={e?.ip}
          ></GameTile>
        ))}
      </div>
    </>
  );
};

export default memo(GameGrid);
