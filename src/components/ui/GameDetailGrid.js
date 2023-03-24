import React, { memo } from "react";

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
import SidebarMB from "@/components/responsive/SidebarMB";
import ImageLoading from "@/components/loading/ImageLoading";

import { getArea, getRandom } from "@/utils/helper";

import { GAMES_IMAGES } from "@/utils/constant";
import { useMediaQuery } from "@chakra-ui/react";

const GameDetailGrid = () => {
  const { info, gamesRelate } =
    useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const { title, thumbnail, play_url } = info ?? {};

  return (
    <div>
      <div className="game-detail-grid">
        {/* Tablet Mobile  */}
        <SidebarMB className={"tbl-flex"} />
        <GameTitle area="gt" thumbnail={thumbnail} title={title}></GameTitle>
        <GameScreenBar area="gsb" className="rounded-2xl mb-flex" />

        {/* PC  */}
        <ShareToEarn area="ste" />
        <ReferAFriend area="raf" />
        <GameScreen play_url={play_url} thumbnail={thumbnail} title={title} />
        <BoxChat area="bc" />
        <GameInfo area="gi" />
        <TopHallOfFame area="hof" />
        <Advertisements />

        {/* games relate */}
        {gamesRelate?.map((e, i) => (
          <GameItem
            key={i}
            title={e?.title}
            thumbnail={e?.thumbnail}
            slug={e?.slug}
            superslug={e?.superslug}
          />
        ))}

        {/* loading  */}
        {!gamesRelate &&
          Array(20)
            .fill(0)
            ?.map((e, i) => (
              <div
                key={i}
                className="w-[94px] h-[94px] skeleton-shine rounded-2xl"
              ></div>
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

const Advertisements = memo(function AdvertisementsComponent() {
  const { list } = useSelector(({ advertisements }) => advertisements) ?? {};

  const matches = useMediaQuery("(max-width: 550px)");
  return (
    <>
      {list?.length > 0 &&
        list
          ?.slice(0, 4)
          .map((e, i) => (
            <Ads
              thumbnail={e?.url}
              key={i}
              area={`ads${i + 1}`}
              ip={e?.ip}
              className={matches[0] && i !== 0 ? "hidden" : ""}
            />
          ))}
    </>
  );
});
