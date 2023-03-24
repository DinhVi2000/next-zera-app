import React, { Fragment, memo } from "react";

import GameItem from "@/components/game/GameItem";
import { getArea, inRange } from "@/utils/helper";
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

      <LoadingGrid list={games} />
    </div>
  );
};

export default memo(GameGrid);

const LoadingGrid = memo(function Component({ list }) {
  return (
    <Fragment>
      {!list &&
        Array(124)
          .fill(0)
          ?.map((e, i) => (
            <div
              key={i}
              className="w-full h-full rounded-2xl skeleton-shine"
              style={{
                gridArea: inRange(i, 0, 16) ? getArea(`ip${i}`) : "auto",
              }}
            ></div>
          ))}
    </Fragment>
  );
});
