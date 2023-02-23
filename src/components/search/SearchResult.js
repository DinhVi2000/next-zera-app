import React, { memo, useEffect } from "react";
import { useRef } from "react";

import { sleep } from "@/utils/helper";

import GameItem from "../game/GameItem";

const SearchResult = ({ games }) => {
  const no_result_ref = useRef();

  useEffect(() => {
    if (!games || games.length === 0)
      sleep(1).then(() => {
        no_result_ref?.current.classList.replace("h-0", "h-[93px]");
      });
  }, [games]);

  if (!games || games?.length === 0)
    return (
      <div ref={no_result_ref} className="h-0 transition-all my-6">
        <div className="bg-white px-6 py-[18px] rounded-[2px] w-full max-w-[612px] ">
          <h2 className="text-[22px] font-bold">
            Sorry, we don’t have anything like that.
          </h2>
          <p className="font-medium">Can you try something else?</p>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-6 gap-4 mt-10">
      {games?.map(({ thumbnail, title }, i) => (
        <GameItem key={i} thumbnail={thumbnail} title={title} />
      ))}
    </div>
  );
};

export default memo(SearchResult);
