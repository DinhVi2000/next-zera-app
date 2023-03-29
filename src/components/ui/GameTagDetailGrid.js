import React, { memo } from "react";

import { useSelector } from "react-redux";

import GameItem from "@/components/game/GameItem";
import SidebarMB from "../responsive/SidebarMB";

const GameTagDetailGrid = () => {
  const { gameDetailByTag } = useSelector(({ game }) => game) ?? {};
  const { allGameByTags, gameTag } = gameDetailByTag ?? {};

  return (
    <div className="grid-responsive grid gap-4 transition-all">
      <SidebarMB className={"tbl-flex mb-flex"} />

      <div
        style={{
          // gridArea: "ct / ct / ct / ct",
          gridRowStart: "span 1",
          gridColumnStart: "span 3",
          background:
            "linear-gradient(180deg, #C4B5FD 0%, #979BFF 0.01%, #EF36C6 100%)",
        }}
        className="text-white min-h-[94px] max-[551px]:grid-col-start-span-2 rounded-2xl flex items-center justify-center text-lg font-bold"
      >
        {gameTag?.label}
      </div>

      {/* game */}
      <ul className="contents">
        {allGameByTags?.length > 0 &&
          allGameByTags?.map(({ game_detail }, i) => (
            <li key={i} className="contents">
              <GameItem
                id={game_detail?.id}
                index={i}
                thumbnail={game_detail?.thumbnail}
                title={game_detail?.title}
                // style={{
                //   gridArea:
                //     i < 8
                //       ? `g${i + 1} / g${i + 1} / g${i + 1} / g${i + 1}`
                //       : "",
                // }}
                slug={game_detail?.slug}
                superslug={game_detail?.superslug}
              />
            </li>
          ))}
      </ul>

      {!gameDetailByTag &&
        Array(40)
          .fill(0)
          .map((e, i) => (
            <ItemLoading
              key={i}
              // style={{
              //   gridArea:
              //     i < 8 ? `g${i + 1} / g${i + 1} / g${i + 1} / g${i + 1}` : "",
              // }}
            ></ItemLoading>
          ))}
    </div>
  );
};

const ItemLoading = ({ ...props }) => {
  return (
    <div
      {...props}
      className="skeleton-shine w-full h-full rounded-2xl min-h-[94px]"
    ></div>
  );
};

export default memo(GameTagDetailGrid);
