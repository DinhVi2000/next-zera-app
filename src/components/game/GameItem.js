/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";

import Link from "next/link";

import { IconRecently } from "@/resources/icons";

import ImageLoading from "@/components/loading/ImageLoading";
import { getArea, inRange } from "@/utils/helper";
import { dynamicPaths } from "@/utils/$path";

const MAX_WITDH = 314;

const GameItem = ({
  id,
  index,
  thumbnail,
  area,
  title,
  isRecently,
  className,
  slug,
  superSlug,
  ...props
}) => {
  const gridArea = inRange(index, 0, 16) && area ? getArea(area) : "auto";

  const game_item_ref = useRef();

  useEffect(() => {
    if (!game_item_ref) return;
    if (game_item_ref.current.offsetWidth === MAX_WITDH)
      game_item_ref.current.classList.add("shine-effect");
  }, [game_item_ref]);

  return (
    <div
      className={`${className} relative overflow-hidden rounded-2xl cursor-pointer select-none group min-h-[94px] min-w-[94px]  
                  hover:translate-y-[-2px] hover:scale-105 transition-all hover:shadow-xl `}
      style={{ gridArea }}
      ref={game_item_ref}
      {...props}
    >
      <Link
        href={dynamicPaths.game_by_slug(superSlug?.value, slug)}
        className="game-item__box-shadow"
      >
        {isRecently && (
          <span className="absolute top-4 left-[-2px] z-100">
            <IconRecently></IconRecently>
          </span>
        )}

        <ImageLoading
          alt=""
          src={thumbnail}
          className="w-full h-full object-cover rounded-2xl"
        ></ImageLoading>
        <div
          className="absolute text-white bottom-0 text-center w-full font-bold opacity-0 translate-y-0
                     group-hover:opacity-100 group-hover:translate-y-[-8px] transition-all duration-300"
        >
          {/* <Tooltip hasArrow label={title} bg="gray.600" color="white"> */}
          <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full text-white px-2">
            {title || "Games"}
          </p>
          {/* </Tooltip> */}
        </div>
      </Link>
    </div>
  );
};

export default GameItem;
