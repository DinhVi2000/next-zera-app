import React from "react";

import { getArea } from "@/utils/helper";

import { useSelector } from "react-redux";

import GameCategory from "@/components/game/GameCategory";
import GameItem from "@/components/game/GameItem";
import SidebarMB from "../responsive/SidebarMB";

const GameCategoryDetailGrid = () => {
  const { categoryDetail } = useSelector(({ game }) => game) ?? {};

  const { game_category, other_category } = categoryDetail ?? {};
  const { game_detail, label } = game_category ?? {};

  return (
    <div className="grid-responsive grid gap-4 transition-all">
      <SidebarMB className={"tbl-flex mb-flex"} />

      <header
        style={{
          gridRowStart: "span 1",
          gridColumnStart: "span 3",
          background:
            "linear-gradient(180deg, #C4B5FD 0%, #979BFF 0.01%, #EF36C6 100%)",
        }}
        className="text-white min-h-[94px] max-[551px]:grid-col-start-span-2 rounded-2xl flex items-center justify-center text-lg font-bold"
      >
        {label}
      </header>

      {/* game */}
      <ul className="contents">
        {game_detail?.length > 0 &&
          game_detail?.map((e, i) => (
            <li key={i} className="contents">
              <GameItem
                id={e?.id}
                index={i}
                thumbnail={e?.thumbnail}
                title={e?.title}
                // style={{
                //   gridArea: i < 7 ? getArea(`g${i + 1}`) : "",
                // }}
                slug={e?.slug}
                superslug={e?.superslug}
              />
            </li>
          ))}
      </ul>

      {!game_detail &&
        Array(20)
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
              gridRowStart: "span 1",
              gridColumnStart: "span 2",
              // gridArea: `c${i + 1} / c${i + 1} / c${i + 1} / c${i + 1}`,
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

export default GameCategoryDetailGrid;
