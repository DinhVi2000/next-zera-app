/* eslint-disable @next/next/no-img-element */
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
import { sleep } from "@/utils/helper";
import { Fragment, useEffect, useRef } from "react";

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

const ITEM_BASE_TAB = {
  ZERA: (
    <Fragment>
      <IconCoin className="w-[30px] h-[30px]" />
      <span className="text-[28px] font-bold">9000</span>
    </Fragment>
  ),
  GAME_PLAYED: (
    <Fragment>
      <IconGamePad className="w-[35px] h-7" />
      <span className="text-[28px] font-bold">9000</span>
    </Fragment>
  ),
  PLAYSTREAK: (
    <div className="flex flex-col items-center gap-1">
      <div className="flex justify-between items-center w-full pt-4 relative">
        <IconLeftWing className="w-6 h-14" />
        <span className="text-gradient-hof text-[32px] font-bold mt-2">10</span>
        <IconRightWing className="w-6 h-14" />
      </div>
      <p className="text-sm font-medium">playstreak</p>
    </div>
  ),
};

const DURATION_BASE_PLACE = {
  1: "duration-500",
  2: "duration-500",
  3: "duration-500",
};

const Rank = ({ className = "", places, tab, ...props }) => {
  const rankRef = useRef();

  //   useEffect(() => {
  //     sleep(1).then(() => {
  //       rankRef.current.classList.add("opacity-100");
  //       rankRef.current.classList.replace("translate-y-4", "translate-y-0");
  //     });
  //   }, []);

  useEffect(() => {
    rankRef.current.classList.remove("opacity-100");
    rankRef.current.classList.replace("translate-y-0", "translate-y-4");
    sleep(500).then(() => {
      rankRef.current.classList.add("opacity-100");
      rankRef.current.classList.replace("translate-y-4", "translate-y-0");
    });
  }, [tab]);

  return (
    <div
      className={`flex flex-col items-center opacity-0 translate-y-4 transition-all ${
        DURATION_BASE_PLACE[places]
      } ${className}  ${[2, 3].includes(places) && "pt-[44px]"}`}
      ref={rankRef}
      {...props}
    >
      <div className="inline-block mb-5">
        <img
          src="https://img.freepik.com/free-vector/cute-shiba-inu-dog-super-flying-cartoon-illustration-animal-nature-concept-isolated-flat-cartoon-style_138676-3436.jpg?w=2000"
          alt=""
          className="w-[94px] h-[94px] object-cover inline-block rounded-[10px]"
        />

        {/* username */}
        <p className="text-base text-white text-center font-medium mt-2.5">
          Viodka
        </p>
      </div>

      <div className="relative">
        {MEDAL_BASE_PLACES[places]}
        <IconRank className="w-[233px] h-[158px]" />

        <div className="flex items-center gap-2.5 top-1/3 left-1/2 -translate-x-1/2 absolute">
          {ITEM_BASE_TAB[tab.value]}
        </div>
      </div>
    </div>
  );
};

export default Rank;
