import React, { memo } from "react";

import { useSelector } from "react-redux";

import GameCategory from "@/components/game/GameCategory";
import GameItem from "@/components/game/GameItem";
import SidebarMB from "../responsive/SidebarMB";

const GameTagDetailGrid = () => {
  const { gameDetailByTag } = useSelector(({ game }) => game) ?? {};
  const { game_category, other_category } = gameDetailByTag ?? {};

  return (
    <div className="grid-category-detail transition-all">
      <SidebarMB className={"tbl-flex mb-flex"} />

      <div
        style={{
          gridArea: "ct / ct / ct / ct",
          background:
            "linear-gradient(180deg, #C4B5FD 0%, #979BFF 0.01%, #EF36C6 100%)",
        }}
        className="text-white min-h-[94px] rounded-2xl flex items-center justify-center text-lg font-bold"
      >
        {gameDetailByTag && gameDetailByTag[0]?.game_tag?.label}
      </div>

      {/* game */}
      <ul className="contents">
        {gameDetailByTag?.length > 0 &&
          gameDetailByTag?.map(({ game_detail }, i) => (
            <li key={i} className="contents">
              <GameItem
                id={game_detail?.id}
                index={i}
                thumbnail={game_detail?.thumbnail}
                title={game_detail?.title}
                style={{
                  gridArea:
                    i < 8
                      ? `g${i + 1} / g${i + 1} / g${i + 1} / g${i + 1}`
                      : "",
                }}
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
              style={{
                gridArea:
                  i < 8 ? `g${i + 1} / g${i + 1} / g${i + 1} / g${i + 1}` : "",
              }}
            ></ItemLoading>
          ))}

      {/* category */}
      {other_category?.length > 0 &&
        other_category.slice(0, 4)?.map((e, i) => (
          <GameCategory
            key={i}
            id={e?.id}
            index={i + 7}
            label={e?.label}
            thumbnail={e?.thumbnail}
            style={{
              gridArea: `c${i + 1} / c${i + 1} / c${i + 1} / c${i + 1}`,
            }}
            slug={e?.slug}
            superslug={e?.superslug}
          />
        ))}

      {!other_category &&
        Array(4)
          .fill(0)
          .map((e, i) => (
            <ItemLoading
              key={i}
              style={{
                gridArea: `c${i + 1} / c${i + 1} / c${i + 1} / c${i + 1}`,
              }}
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
