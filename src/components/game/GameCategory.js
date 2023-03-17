/* eslint-disable @next/next/no-img-element */
import { dynamicPaths } from "@/utils/$path";
import { inRange } from "@/utils/helper";
import Link from "next/link";
import React from "react";
import ImageLoading from "../loading/ImageLoading";

const GameCategory = ({
  id,
  index,
  label,
  thumbnail,
  superslug,
  slug,
  className,
  ...props
}) => {
  const isMinSize = !inRange(index, 0, 6);

  return (
    <Link
      {...props}
      className={`${className} rounded-2xl overflow-hidden relative cursor-pointer min-w-[204px] max-w-[204px] min-h-[94px] max-h-[204px] bg-white 
                      ${isMinSize ? "flex items-center justify-start" : ""}
                      hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 shadow-[0px_6px_12px_0px_rgb(0,0,0,0.24)]`}
      href={dynamicPaths.category_by_slug(superslug?.value, slug)}
    >
      {/* thumbnail */}
      <ImageLoading
        alt=""
        src={thumbnail}
        className={`w-full h-full object-cover  ${
          isMinSize ? "max-w-[94px]" : "max-h-[168px]"
        } `}
      ></ImageLoading>

      {/* description */}
      <span className="bg-white text-violet-900 uppercase  w-full bottom-0 px-4 font-bold text-[13px] h-9 flex items-center">
        {label}
      </span>
    </Link>
  );
};

export default GameCategory;
