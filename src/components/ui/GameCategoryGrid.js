import React, { memo } from "react";

import Categories from "@/api/categories.json";
import GameCategory from "@/components/game/GameCategory";

const GameCategoryGrid = () => {
  return (
    <div className="category-grid py-4">
      {Categories.map((e, i) => (
        <GameCategory
          key={i}
          style={{
            gridArea: `c${e?.ip} / c${e?.ip} / c${e?.ip} / c${e?.ip}`,
          }}
          size={e?.size}
        ></GameCategory>
      ))}
    </div>
  );
};

export default memo(GameCategoryGrid);
