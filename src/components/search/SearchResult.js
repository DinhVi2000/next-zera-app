import React, { Fragment, memo, useEffect, useMemo } from "react";
import { useRef } from "react";

import { sleep } from "@/utils/helper";

import GameItem from "../game/GameItem";

import { useModalContext } from "@/context/modal-context";
import GameCategory from "../game/GameCategory";

const SearchResult = ({ results }) => {
  const { game, category, gameByCategory } = results ?? {};

  const { closeModal } = useModalContext();

  return (
    <Fragment>
      <NoData results={results} />
      {/* list */}
      <div
        className="modal-scroll grid grid-cols-[repeat(6,94px)] grid-rows-[repeat(5,94px)] gap-4 absolute top-0 bottom-[-62px] py-[120px] max-w-[644px]
                   overflow-y-scroll overflow-x-hidden"
      >
        {category?.map((e, i) => (
          <GameCategory
            key={i}
            id={e?.id}
            label={e?.label}
            thumbnail={e?.thumbnail}
            slug={e?.slug}
            superslug={e?.superslug}
            style={{
              gridRowStart: "span 1",
              gridColumnStart: "span 2",
            }}
            className="max-h-[94px]"
          />
        ))}
        {game?.concat(gameByCategory)?.map((e, i) => (
          <GameItem
            key={i}
            thumbnail={e?.thumbnail}
            title={e?.title}
            id={e?.id}
            onClick={closeModal}
            slug={e?.slug}
            superSlug={e?.superslug}
            className="h-[94px]"
          />
        ))}
      </div>
    </Fragment>
  );
};

export default memo(SearchResult);

const NoData = memo(function NoDataComponent({ results }) {
  const no_result_ref = useRef();

  const resultsLength = useMemo(() => {
    if (results)
      return Object.values(results).reduce((acc, val) => acc + val.length, 0);
  }, [results]);

  useEffect(() => {
    if (results && no_result_ref)
      sleep(1).then(() => {
        no_result_ref?.current?.classList.replace("h-0", "h-[94px]");
      });
  }, [results, no_result_ref]);

  return (
    <>
      {resultsLength === 0 && (
        <div ref={no_result_ref} className="h-0 transition-all my-6">
          <div className="bg-white px-6 py-[18px] rounded-[2px] w-full max-w-[612px] ">
            <h2 className="text-[22px] font-bold">
              Sorry, we don’t have anything like that.
            </h2>
            <p className="font-medium">Can you try something else?</p>
          </div>
        </div>
      )}
    </>
  );
});
