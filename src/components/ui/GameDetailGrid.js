import React, { memo } from "react";

import GameItem from "@/components/game/GameItem";
import Ads from "@/components/other/Ads";
import BoxChat from "@/components/box-chat/BoxChat";
import GameScreenBar from "../game/GameScreenBar";
import GameInfo from "../game/GameInfo";
import TopHallOfFame from "../other/TopHallOfFame";
import ShareToEarn from "../other/ShareToEarn";
import ReferAFriend from "../other/ReferAFriend";
import { useSelector } from "react-redux";

const GameDetailGrid = () => {
  const { info, gamesRelate } =
    useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const { title, thumbnail, play_url } = info ?? {};

  return (
    <div>
      <div className="game-detail-grid">
        {/* list ads */}
        {Array(4)
          .fill(0)
          .map((e, i) => (
            <Ads key={i} area={`ads${i + 1}`} ip={e?.ip}></Ads>
          ))}

        {/* ShareToEarn */}
        <ShareToEarn
          style={{
            gridArea: "ste / ste / ste / ste",
          }}
        />

        {/* refer a friend */}
        <ReferAFriend
          style={{
            gridArea: "raf / raf / raf / raf",
          }}
        />

        {/* game screen */}
        <div
          style={{
            gridArea: "gs / gs / gs / gs",
          }}
          className="h-full flex flex-col"
        >
          <iframe
            className={`${!thumbnail && "skeleton-shine"} flex-1`}
            width="100%"
            frameBorder="0"
            marginHeight="0"
            vspace="0"
            hspace="0"
            scrolling="no"
            allowFullScreen={true}
            src={play_url}
          ></iframe>
          <GameScreenBar title={title} thumbnail={thumbnail} />
        </div>

        {/* box chat  */}
        <BoxChat area={"bc"}></BoxChat>

        {/* game info */}
        <GameInfo
          style={{
            gridArea: "gi / gi / gi / gi",
          }}
        />

        {/* hall of fame */}
        <TopHallOfFame
          style={{
            gridArea: "hof / hof / hof / hof",
          }}
        />
        {/* games relate */}
        {gamesRelate?.map((e, i) => (
          <GameItem
            key={i}
            // style={{
            //   gridArea: `d${i + 1} / d${i + 1} / d${i + 1} / d${i + 1}`,
            // }}
            title={e?.title}
            thumbnail={e?.thumbnail}
          ></GameItem>
        ))}
      </div>
    </div>
  );
};

export default memo(GameDetailGrid);
