/* eslint-disable @next/next/no-img-element */
import { getArea } from "@/utils/helper";
import React from "react";
import { useSelector } from "react-redux";

const GameInfo = ({ area, ...props }) => {
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const {
    game_category,
    title,
    developer,
    love_count,
    description,
    trailer_url,
  } = info ?? {};

  return (
    <div
      style={{ gridArea: getArea(area) }}
      className="mb-hidden bg-[#18181899] border-[2px] border-pink-600 rounded-[10px] p-6 text-white overflow-auto"
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
          <p className="text-sm font-semibold  mb-3">
            Game Category / {game_category?.name}
          </p>

          <h2 className="text-[28px] font-semibold mb-3">{title}</h2>

          <div className="mb-[30px]">
            <p className="text-base font-medium">
              Developed by{" "}
              <span className="text-base font-bold">{developer}</span>
            </p>
            <img src="" alt="" />
          </div>

          <p className="text-base font-bold mb-[26px]">
            {love_count} players loved this game
          </p>

          <div className="text-base font-bold">
            <p>Description of the game:</p>
            <p>{description}</p>
          </div>

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
    </div>
  );
};

export default GameInfo;
