/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import {
  IconBronzeMedal,
  IconCoin,
  IconGamePad,
  IconGoldMedal,
  IconLeftWing,
  IconRank,
  IconRightWing,
  IconSilverMedal,
} from "@/resources/icons";

import { DEFAULT_AVATAR_SRC, QUANTITY_BY_TAB } from "@/utils/constant";

import { sleep } from "@/utils/helper";

import ImageLoading from "@/components/loading/ImageLoading";

const MEDAL_BASE_PLACES = {
  1: (
    <IconGoldMedal className="top-[-10px] left-1/2 -translate-x-1/2 absolute" />
  ),
  2: (
    <IconSilverMedal className="top-[-10px] left-1/2 -translate-x-1/2 absolute" />
  ),
  3: (
    <IconBronzeMedal className="top-[-10px] left-1/2 -translate-x-1/2 absolute" />
  ),
};

const Rank = ({ className = "", data, places, tab, ...props }) => {
  const [delayTab, setDelayTab] = useState();
  const [delayData, setDelayData] = useState();

  const rankRef = useRef();

  const ITEM_BASE_TAB = {
    zera: (
      <Fragment>
        <IconCoin className="w-[30px] h-[30px]" />
        <span className="text-[28px] font-bold">
          {QUANTITY_BY_TAB.zera(delayData)}
        </span>
      </Fragment>
    ),
    games_played: (
      <Fragment>
        <IconGamePad className="w-[35px] h-7" />
        <span className="text-[28px] font-bold">
          {" "}
          {QUANTITY_BY_TAB.games_played(delayData)}
        </span>
      </Fragment>
    ),
    playstreak: (
      <div className="flex flex-col items-center gap-1">
        <div className="flex justify-between items-center w-full pt-4 relative">
          <IconLeftWing className="w-6 h-14" />
          <span className="text-gradient-hof text-[32px] font-bold mt-2">
            {QUANTITY_BY_TAB.playstreak(delayData)}
          </span>
          <IconRightWing className="w-6 h-14" />
        </div>
        <p className="text-sm font-medium">playstreak</p>
      </div>
    ),
  };

  const placeStyle = useMemo(
    () => ([2, 3].includes(places) ? "pt-[44px]" : ""),
    [places]
  );

  useEffect(() => {
    if (!tab) return;
    rankRef.current.classList.remove("opacity-100");
    rankRef.current.classList.replace("translate-y-0", "translate-y-4");
    sleep(500).then(() => {
      rankRef.current.classList.add("opacity-100");
      rankRef.current.classList.replace("translate-y-4", "translate-y-0");
      setDelayTab(tab);
      setDelayData(data);
    });
  }, [tab]);

  return (
    <div
      className={`w-[233px] flex flex-col items-center opacity-0 translate-y-4 transition-all duration-500 ${className}  ${placeStyle}  max-[1210px]:order-${places}`}
      ref={rankRef}
      {...props}
    >
      <div className="inline-block mb-5">
        {/* avatar */}
        <ImageLoading
          src={delayData?.user?.avatar?.url || DEFAULT_AVATAR_SRC}
          alt={delayData?.user?.avatar?.name}
          className="w-[94px] h-[94px] object-cover inline-block rounded-[10px]"
        />

        {/* username */}
        <p className="text-base text-white text-center font-medium mt-2.5">
          {delayData?.user?.username}
        </p>
      </div>

      <div className="relative">
        {/* medal */}
        {MEDAL_BASE_PLACES[places]}
        <IconRank className="w-[233px] max-[551px]:w-[200px] h-[158px]" />

        {/* rank item */}
        <div className="flex items-center gap-2.5 top-1/3 left-1/2 -translate-x-1/2 absolute">
          {ITEM_BASE_TAB[delayTab?.value]}
        </div>
      </div>
    </div>
  );
};

export default Rank;
