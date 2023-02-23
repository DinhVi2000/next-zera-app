import React, { memo } from "react";

import Categories from "@/api/categories.json";
import GameCategory from "@/components/game/GameCategory";
import { useSelector } from "react-redux";

const GameCategoryGrid = ({ categories }) => {
  return (
    <div className="category-grid py-4">
      {categories?.map((e) => (
        <GameCategory
          key={e?.id}
          area={`c${e?.id}`}
          id={e?.id}
          size={e?.size}
          thumbnail={e?.thumbnail}
          description={e?.description}
        ></GameCategory>
      ))}
    </div>
  );
};

export default memo(GameCategoryGrid);
