/* eslint-disable @next/next/no-img-element */
import { dynamicPaths } from "@/utils/$path";
import {
  formatDate,
  gameDetailUrl,
  getArea,
} from "@/utils/helper";
import Link from "next/link";
import React, { memo } from "react";
import { useSelector } from "react-redux";

const GameInfo = ({ area, ...props }) => {
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const {
    created_at,
    description,
    developer,
    game_category,
    love_count,
    superslug,
    slug,
    trailer_url,
    title,
  } = info ?? {};

  return (
    <div
      style={{ gridArea: getArea(area) }}
      className="bg-[#18181899] border-[2px] border-pink-600 rounded-[10px] p-6 text-white overflow-auto"
      {...props}
    >
      {!info ? (
        <>
          <div className="h-2.5 w-24 skeleton-shine rounded-2xl"></div>
          <div className="h-5 w-40 skeleton-shine rounded-2xl my-3"></div>
          <div className="h-2.5 w-60 skeleton-shine rounded-2xl my-2"></div>
        </>
      ) : (
        <>
          {/* breadcrumb */}
          <div className="text-sm font-semibold  mb-5">
            <span>{superslug?.label} </span> /
            <Link
              href={dynamicPaths.category_by_slug(
                game_category?.superslug?.value,
                game_category?.slug
              )}
            >
              {" "}
              {game_category?.label}
            </Link>{" "}
            /<Link href={gameDetailUrl(superslug?.value, slug)}> {title}</Link>
          </div>

          <h2 className="text-[28px] font-semibold leading-[25px]">{title}</h2>
          {created_at && (
            <p className="text-pink-300 mb-3 text-sm">
              {formatDate(created_at)}
            </p>
          )}

          {developer && (
            <div className="mb-[30px]">
              <p className="text-base font-medium">
                Developed by{" "}
                <span className="text-base font-bold">{developer}</span>
              </p>
              <img src="" alt="" />
            </div>
          )}

          <p className="text-base font-bold mb-[26px]">
            {love_count || 0} {love_count > 1 ? "players" : "player"} loved this
            game
          </p>

          {description && (
            <div className="text-base font-bold">
              <p>Description of the game:</p>
              <p>{description}</p>
            </div>
          )}

          {trailer_url && (
            <>
              <div>Trailer</div>
              <div className="w-full flex justify-center p-4">
                <iframe
                  width="294"
                  src={trailer_url}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default memo(GameInfo);
