import React, { memo, useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import GameItem from "@/components/game/GameItem";
import Ads from "@/components/other/Ads";
import BoxChat from "@/components/box-chat/BoxChat";
import GameScreenBar from "@/components/game/GameScreenBar";
import GameInfo from "@/components/game/GameInfo";
import TopHallOfFame from "@/components/other/TopHallOfFame";
import ShareToEarn from "@/components/other/ShareToEarn";
import ReferAFriend from "@/components/other/ReferAFriend";
import GameScreen from "@/components/game/GameScreen";
import Menu from "@/components/responsive/Menu";
import ImageLoading from "@/components/loading/ImageLoading";

import { getArea, getRandom } from "@/utils/helper";

import { ADS_IMAGES, GAMES_IMAGES } from "@/utils/constant";

import { useAuthContext } from "@/context/auth-context";

const GameDetailGrid = () => {
  const { setIsCountDown } = useAuthContext();

  const { info, gamesRelate } =
    useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const { title, thumbnail, play_url } = info ?? {};
  const ref = useRef(null);
  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY > ref.current?.clientHeight) {
        setIsCountDown(false);
      } else {
        setIsCountDown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div className="game-detail-grid">
        {/* Tablet / Mobile  */}
        <Menu className={"tbl-flex"} />
        <GameTitle area="gt" thumbnail={thumbnail} title={title}></GameTitle>
        <GameScreenBar area="gsb" className="rounded-2xl mb-flex" />

        {/* PC */}
        <ShareToEarn area="ste" />
        <ReferAFriend area="raf" />
        <GameScreen play_url={play_url} thumbnail={thumbnail} title={title} />
        <BoxChat area="bc" />
        <GameInfo area="gi" />
        <TopHallOfFame area="hof" />
        {ADS_IMAGES.map((e, i) => (
          <Ads thumbnail={e} key={i} area={`ads${i + 1}`} ip={e?.ip} />
        ))}

        {/* games relate */}
        {gamesRelate?.map((e, i) => (
          <GameItem key={i} title={e?.title} thumbnail={e?.thumbnail} />
        ))}

        {/* fake data */}
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

        {/* loading  */}
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

const GameTitle = memo(function GameTitleComponent({
  area,
  title,
  thumbnail,
  ...props
}) {
  return (
    <div
      {...props}
      style={{ gridArea: getArea(area) }}
      className="h-[94px] text-white bg-[#373737] rounded-2xl items-center gap-2.5 px-5 mb-flex"
    >
      <ImageLoading src={thumbnail} className="w-[50px] h-[50px] rounded-xl" />
      <span className="font-bold">{title}</span>
    </div>
  );
});
