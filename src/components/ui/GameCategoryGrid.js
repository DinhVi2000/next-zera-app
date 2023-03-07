/* eslint-disable @next/next/no-img-element */
import React, { memo } from "react";

import GameCategory from "@/components/game/GameCategory";

import { inRange } from "@/utils/helper";

import newsImg from "@/../public/images/news.avif";

import Link from "next/link";

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

        <ArticleItem />
      </div>
    </>
  );
};

export default memo(GameCategoryGrid);

const ArticleItem = () => {
  return (
    <Link
      className="rounded-2xl overflow-hidden relative cursor-pointer min-w-[204px] max-w-[204px] min-h-[94px] max-h-[204px] bg-white flex items-center justify-start
                      hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 shadow-[0px_6px_12px_0px_rgb(0,0,0,0.24)]"
      href={"/article"}
      style={{
        gridRowStart: "span 1",
        gridColumnStart: "span 2",
      }}
    >
      <img
        alt="news"
        src={newsImg.src}
        className="w-full h-full object-cover max-w-[94px]"
      />
      <span className="bg-white text-violet-900 uppercase w-full bottom-0 px-4 font-bold text-[13px] h-9 flex items-center">
        Articles
      </span>
    </Link>
  );
};
