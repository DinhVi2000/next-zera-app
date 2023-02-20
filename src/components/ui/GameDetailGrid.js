import React, { memo } from "react";

import GameTile from "@/components/game/GameTile";
import Ads from "@/components/game/Ads";
import BoxChat from "@/components/box-chat/BoxChat";

const GameDetailGrid = () => {
  return (
    <div className="game-detail-grid">
      {/* list ads */}
      {Array(6)
        .fill(0)
        .map((e, i) => (
          <Ads key={i} area={`ads${i + 1}`} ip={e?.ip}></Ads>
        ))}

      {/* game screen */}
      <iframe
        style={{
          gridArea: "gs / gs / gs / gs",
        }}
        width="100%"
        height="100%"
        frameBorder="0"
        marginWidth="0"
        marginHeight="0"
        vspace="0"
        hspace="0"
        scrolling="no"
        allowFullScreen={true}
        src="https://h5.4j.com/Amaze/index.php?pubid=yourlogo"
      ></iframe>

      {/* box chat  */}
      <BoxChat area={"bc"}></BoxChat>

      {/* games */}
      {Array(2)
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
