import React, { memo } from "react";

import Categories from "@/api/categories.json";
import GameCategory from "@/components/game/GameCategory";

const GameCategoryGrid = ({ categories }) => {
  return (
    <div className="category-grid py-4">
      {categories?.map((e, i) => (
        <GameCategory
          key={i}
          style={{
            gridArea: `c${i + 1} / c${i + 1} / c${i + 1} / c${i + 1}`,
          }}
          size={e?.size}
          thumbnail={e?.thumbnail}
          description={e?.description}
        ></GameCategory>
      ))}
    </div>
  );
};

export default memo(GameCategoryGrid);
