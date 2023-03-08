import React, { memo } from "react";

import GameItem from "@/components/game/GameItem";
import { getGridSpanValue, getRandom } from "@/utils/helper";
import { GAMES_IMAGES } from "@/utils/constant";
import Menu from "../responsive/Menu";

const GameGrid = ({ games }) => {
  return (
    <>
      {games && (
        <div className="grid-category">
          <Menu className={"mb-block"} />

          {games?.map((e, i) => (
            <GameItem
              key={e?.id}
              id={e?.id}
              area={`ip${i}`}
              index={i}
              thumbnail={e?.thumbnail}
              title={e?.title}
              tileGrid={e?.tilegrid}
            ></GameItem>
          ))}
        </div>
      )}

      {!games && (
        <div className="game-grid">
          {/* Tablet / mobile */}

          {Array(124)
            .fill(0)
            ?.map((e, i) => (
              <GameItem
                key={i}
                id={i}
                area={`ip${i}`}
                index={i}
                thumbnail={""}
                title={`game ${i}`}
              ></GameItem>
            ))}

          {/* {games?.map((e, i) => (
          <GameItem
            key={e?.id}
            id={e?.id}
            area={`ip${i}`}
            index={i}
            thumbnail={e?.thumbnail}
            title={e?.title}
            tileGrid={e?.tilegrid}
          ></GameItem>
          ))} */}

          {/* {Array(124 - games?.length || 0)
          .fill(0)
          ?.map((e, i) => (
            <GameItem
              key={games?.length + i}
              id={games?.length + i}
              area={`ip${games?.length + i}`}
              index={games?.length + i}
              thumbnail={getRandom(GAMES_IMAGES)}
              title={`game ${games?.length + i}`}
            ></GameItem>
          ))}*/}
        </div>
      )}
    </>
  );
};

export default memo(GameGrid);
