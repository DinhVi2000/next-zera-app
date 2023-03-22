/* eslint-disable @next/next/no-img-element */
import React, { memo } from "react";

import GameCategory from "@/components/game/GameCategory";

import { inRange } from "@/utils/helper";

import newsImg from "@/../public/images/news.avif";

import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCategoryDetail } from "@/services/game.service";

const GameCategoryGrid = ({ categories, className }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`grid-category mt-4 ${className}`}
        onClick={() => dispatch(setCategoryDetail(null))}
      >
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
            superslug={e?.superslug}
            slug={e?.slug}
            className={inRange(i, 0, 6) ? "h-[204px]" : "h-[94px]"}
          ></GameCategory>
        ))}
      </div>
    </>
  );
};

export default memo(GameCategoryGrid);
