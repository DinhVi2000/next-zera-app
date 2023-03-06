import React, { memo, useEffect, useRef, useState } from "react";

import GameItem from "@/components/game/GameItem";
import Ads from "@/components/other/Ads";
import BoxChat from "@/components/box-chat/BoxChat";
import GameScreenBar from "../game/GameScreenBar";
import GameInfo from "../game/GameInfo";
import TopHallOfFame from "../other/TopHallOfFame";
import ShareToEarn from "../other/ShareToEarn";
import ReferAFriend from "../other/ReferAFriend";
import { useSelector } from "react-redux";
import { getRandom } from "@/utils/helper";
import { ADS_IMAGES, GAMES_IMAGES } from "@/utils/constant";
import GameScreen from "../game/GameScreen";
import { useAuthContext } from "@/context/auth-context";

const GameDetailGrid = () => {
  const { setIsCountDown } = useAuthContext();

  const { info, gamesRelate } =
    useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const { title, thumbnail, play_url } = info ?? {};
  const ref = useRef(null);
  useEffect(() => {
    const handleScroll = event => {
      if (window.scrollY > ref.current?.clientHeight) {
        setIsCountDown(false);
      } else {
        setIsCountDown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <div className="game-detail-grid">
        {/* list ads */}
        {ADS_IMAGES.map((e, i) => (
          <Ads thumbnail={e} key={i} area={`ads${i + 1}`} ip={e?.ip}></Ads>
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

        <GameScreen play_url={play_url} thumbnail={thumbnail} title={title} />
        <div
          style={{
            gridArea: "gs / gs / gs / gs",
          }}
          className="h-full flex flex-col bg-white"
          ref={ref}
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
          {/* <GameScreenBar title={title} thumbnail={thumbnail} /> */}
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

        {Array(50 - gamesRelate?.length || 0)
          .fill(0)
          ?.map((e, i) => (
            <GameItem
              key={gamesRelate?.length + i}
              id={gamesRelate?.length + i}
              index={gamesRelate?.length + i}
              thumbnail={getRandom(GAMES_IMAGES)}
              title={`game ${gamesRelate?.length + i}`}
            ></GameItem>
          ))}

        {!gamesRelate &&
          Array(50)
            .fill(0)
            ?.map((e, i) => (
              <GameItem
                key={i}
                id={i}
                index={i}
                thumbnail={getRandom(GAMES_IMAGES)}
                title={`game ${i}`}
              ></GameItem>
            ))}
      </div>
    </div>
  );
};

export default memo(GameDetailGrid);
