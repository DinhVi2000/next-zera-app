import React, { memo } from "react";

import Categories from "@/api/categories.json";
import GameCategory from "@/components/game/GameCategory";
import { useSelector } from "react-redux";
import { inRange } from "@/utils/helper";

const GameCategoryGrid = ({ categories, className }) => {
  return (
    <>
      <div className={`grid-category mt-4 ${className}`}>
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
