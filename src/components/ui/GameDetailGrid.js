import React, { memo } from "react";

import GameTile from "@/components/game/GameTile";
import Ads from "@/components/game/Ads";
import BoxChat from "@/components/box-chat/BoxChat";
import GameScreenBar from "../game/GameScreenBar";

const GameDetailGrid = ({ game, gamesRelate }) => {
  const { title, thumbnail, play_url } = game || {};

  return (
    <div>
      <div className="game-detail-grid">
        {/* list ads */}
        {Array(6)
          .fill(0)
          .map((e, i) => (
            <Ads key={i} area={`ads${i + 1}`} ip={e?.ip}></Ads>
          ))}

        {/* game screen */}
        <div
          style={{
            gridArea: "gs / gs / gs / gs",
          }}
          className="h-full flex flex-col"
        >
          {thumbnail ? (
            <iframe
              className="rounded-t-2xl flex-1"
              width="100%"
              // height="au"
              frameBorder="0"
              marginWidth="0"
              marginHeight="0"
              vspace="0"
              hspace="0"
              scrolling="no"
              allowFullScreen={true}
              src={play_url}
            ></iframe>
          ) : (
            <div className="skeleton w-full h-full"></div>
          )}
          <GameScreenBar title={title} thumbnail={thumbnail} />
        </div>
        {/* box chat  */}
        <BoxChat area={"bc"}></BoxChat>

        {/* games */}
        {gamesRelate?.map((e, i) => (
          <GameTile
            key={i}
            // style={{
            //   gridArea: `d${i + 1} / d${i + 1} / d${i + 1} / d${i + 1}`,
            // }}
            title={e?.title}
            thumbnail={e?.thumbnail}
          ></GameTile>
        ))}

        {/* {Array(50)
        .fill(0)
        .map((e, i) => (
          <GameTile size={1} key={i}></GameTile>
        ))} */}
      </div>
    </div>
  );
};

export default memo(GameDetailGrid);
