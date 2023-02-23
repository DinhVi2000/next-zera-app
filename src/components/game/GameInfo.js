import React from "react";
import { useSelector } from "react-redux";

const GameInfo = ({ ...props }) => {
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
      className="bg-[#18181899] border-[2px] border-pink-600 rounded-[10px] p-6 text-white overflow-auto"
      {...props}
    >
      <p className="text-sm font-semibold  mb-3">
        Game Category / {game_category?.name}
      </p>

      <h2 className="text-[28px] font-semibold mb-3">{title}</h2>

      <div className="mb-[30px]">
        <p className="text-base font-medium">
          Developed by <span className="text-base font-bold">{developer}</span>
        </p>
        <img src="" alt="" />
      </div>

      <p className="text-base font-bold mb-[26px]">
        {love_count} players loved this game
      </p>

      <div className="text-base font-bold">
        <p>Decription of the game:</p>
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
    </div>
  );
};

export default GameInfo;
