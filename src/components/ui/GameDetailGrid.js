import React, { memo } from "react";

import GameTile from "@/components/game/GameTile";

const GameDetailGrid = () => {
  return (
    <div className="game-detail-grid">
      {/* list ads */}
      {Array(6)
        .fill(0)
        .map((e, i) => (
          <GameTile
            key={i}
            style={{
              gridArea: `ads${i + 1} / ads${i + 1} / ads${i + 1} / ads${i + 1}`,
            }}
            ip={e?.ip}
          ></GameTile>
        ))}
      {Array(4)
        .fill(0)
        .map((e, i) => (
          <GameTile
            size={e?.size}
            key={i}
            style={{
              gridArea: `d${i + 1} / d${i + 1} / d${i + 1} / d${i + 1}`,
            }}
            ip={e?.ip}
          ></GameTile>
        ))}
      {Array(50)
        .fill(0)
        .map((e, i) => (
          <GameTile size={1} key={i}></GameTile>
        ))}
    </div>
  );
};

export default memo(GameDetailGrid);
