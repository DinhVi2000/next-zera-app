import React, { memo } from "react";

import GameItem from "@/components/game/GameItem";
import SidebarMB from "../responsive/SidebarMB";

const GameGrid = ({ games }) => {
  // const video_ref = useRef();

  // useEffect(() => {
  //   video_ref.current.addEventListener("mouseover", function () {
  //     this.play();
  //   });
  //   video_ref.current.addEventListener("mouseout", function () {
  //     this.load();
  //   });
  // }, []);

  return (
    <div className="game-grid">
      {/* Tablet / mobile */}
      <SidebarMB className={"tbl-flex"} />

      {games?.map((e, i) => (
        <GameItem
          key={e?.id}
          id={e?.id}
          area={`ip${i}`}
          index={i}
          thumbnail={e?.thumbnail}
          title={e?.title}
          slug={e?.slug}
          superslug={e?.superslug}
        ></GameItem>
      ))}

      {!games &&
        Array(124)
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
    </div>
  );
};

export default memo(GameGrid);
