import React, { memo } from "react";

import Categories from "@/api/categories.json";
import GameCategory from "@/components/game/GameCategory";
import { useSelector } from "react-redux";
import { inRange } from "@/utils/helper";

const GameCategoryGrid = ({ categories }) => {
  return (
    <>
      {/* <div className="category-grid py-4">
        {categories?.map((e, i) => (
          <GameCategory
            key={e?.id}
            area={`c${i}`}
            id={e?.id}
            index={i}
            size={e?.size}
            thumbnail={e?.thumbnail}
            label={e?.label}
          ></GameCategory>
        ))}
      </div> */}
      <div className="grid-category mt-4">
        {categories?.map((e, i) => (
          <GameCategory
            style={{
              gridRowStart: inRange(i, 0, 6) ? "span 2" : "span 1",
              gridColumnStart: "span 2",
            }}
            key={e?.id}
            id={e?.id}
            index={i}
            thumbnail={e?.thumbnail}
            label={e?.label}
          ></GameCategory>
        ))}
      </div>
    </>
  );
};

export default memo(GameCategoryGrid);
