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
          grid_index={e?.grid_index}
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
  const areaByIndex = (i) => {
    if (inRange(i, 0, 3)) return "xl_" + (i + 1);
    if (inRange(i, 5, 14)) return "lg_" + (i - 4);
    return "auto";
  };

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
                gridArea: getArea(areaByIndex(i)),
              }}
            ></div>
          ))}
    </Fragment>
  );
});
