/* eslint-disable @next/next/no-img-element */
import { dynamicPaths, staticPaths } from "@/utils/$path";
import { formatDate, gameDetailUrl, getArea } from "@/utils/helper";
import Link from "next/link";
import React, { memo } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useSelector } from "react-redux";
import Breadcrumb from "../ui/Breadcrumb";

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
    game_tags,
  } = info ?? {};

  const breadcrumbsData = [
    {
      label: "Home",
      url: staticPaths.home,
    },
    {
      label: game_category?.label,
      url: dynamicPaths.category_by_slug(
        game_category?.superslug?.value,
        game_category?.slug
      ),
    },
    {
      label: title,
      url: dynamicPaths.game_by_slug(superslug?.value, slug),
    },
  ];

  return (
    <div
      style={{ gridArea: getArea(area) }}
      className="bg-[#18181899] border-[2px] border-pink-600 rounded-[10px] p-6 text-white overflow-auto modal-scroll"
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
          <Breadcrumb list={breadcrumbsData} className="mb-5" />

          <h2 className="text-[28px] font-semibold leading-[30px]">{title}</h2>
          {created_at && (
            <p className="text-white text-[10px] mb-3 italic">
              Posted date: {formatDate(created_at)}
            </p>
          )}

          <ScrollContainer>
            <div className="flex whitespace-nowrap gap-2 w-full mb-2">
              {game_tags?.map((e, i) => (
                <Link
                  href={dynamicPaths.game_by_tag(e?.superslug?.value, e?.slug)}
                  key={i}
                >
                  <div className="bg-white flex items-center text-black text-sm rounded-[20px] px-4 h-6">
                    {e?.label}
                  </div>
                </Link>
              ))}
            </div>
          </ScrollContainer>

          {developer && (
            <div className="mb-[30px]">
              <p className="text-base font-medium">
                Developed by{" "}
                <span className="text-base font-bold">{developer}</span>
              </p>
              <img src="" alt="" />
            </div>
          )}

          <p className="text-base font-bold">
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
