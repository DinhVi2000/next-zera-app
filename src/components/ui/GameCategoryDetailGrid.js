import React from "react";

import { GAMES_IMAGES } from "@/utils/constant";

import { getRandom } from "@/utils/helper";

import { useSelector } from "react-redux";

import GameCategory from "@/components/game/GameCategory";
import GameItem from "@/components/game/GameItem";
import Menu from "../responsive/Menu";

const GameCategoryDetailGrid = () => {
  const { categoryDetail } = useSelector(({ game }) => game) ?? {};

  const { game_category, other_category } = categoryDetail ?? {};
  const { game_detail, label } = game_category ?? {};

  return (
    <div className="grid-category-detail transition-all">
      <Menu className={"mb-flex"} />

      <div
        style={{
          gridArea: "ct / ct / ct / ct",
          background:
            "linear-gradient(180deg, #C4B5FD 0%, #979BFF 0.01%, #EF36C6 100%)",
        }}
        className="text-white min-h-[94px] rounded-2xl flex items-center justify-center text-lg font-bold"
      >
        {label}
      </div>

      {/* game */}
      {game_detail?.length > 0 &&
        game_detail?.map((e, i) => (
          <GameItem
            key={i}
            id={e?.id}
            index={i}
            thumbnail={e?.thumbnail}
            title={e?.title}
            style={{
              gridArea:
                i < 8 ? `g${i + 1} / g${i + 1} / g${i + 1} / g${i + 1}` : "",
            }}
          />
        ))}

      {Array(40 - game_detail?.length || 0)
        .fill(0)
        ?.map((e, i) => (
          <GameItem
            key={game_detail?.length + i}
            id={game_detail?.length + i}
            index={game_detail?.length + i}
            thumbnail={getRandom(GAMES_IMAGES)}
            title={`game ${game_detail?.length + i}`}
            style={{
              gridArea:
                game_detail?.length + i < 8
                  ? `g${game_detail?.length + i + 1} / g${
                      game_detail?.length + i + 1
                    } / g${game_detail?.length + i + 1} / g${
                      game_detail?.length + i + 1
                    }`
                  : "",
            }}
          ></GameItem>
        ))}

      {!game_detail &&
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
          />
        ))}

      {/* {Array(4 - other_category?.length || 0)
        .fill(0)
        ?.map((e, i) => (
          <GameCategory
            key={other_category?.length + i}
            id={other_category?.length + e?.id}
            index={other_category?.length + i + 7}
            label={"label"}
            thumbnail={getRandom(GAMES_IMAGES)}
            style={{
              gridArea: `c${other_category?.length + i + 1} / c${
                other_category?.length + i + 1
              } / c${other_category?.length + i + 1} / c${
                other_category?.length + i + 1
              }`,
            }}
          />
        ))} */}

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
    <div {...props} className="skeleton-shine w-full h-full rounded-2xl"></div>
  );
};

export default GameCategoryDetailGrid;
