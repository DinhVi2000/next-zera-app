/* eslint-disable indent */
import { IconPre } from "@/resources/icons";
import { toUpperCaseFirstLetter } from "@/utils/helper";
import React from "react";
import Empty from "../empty/Empty";
import GameItem from "../game/GameItem";

function ListGame({ setIsOpenTab, infoList }) {
  const { payload, listGame } = infoList;

  return (
    <div className="bg-[#00000080] rounded-[20px]">
      <>
        {/* TITLE */}
        <div className="rounded-t-[20px] bg-[#EC4899] py-[16px] pl-[16px] text-[28px] font-bold relative">
          <div
            className="flex items-center text-2xl cursor-pointer"
            onClick={() => {
              setIsOpenTab(false);
            }}
          >
            <IconPre className="mr-1" />
            Back
          </div>
          <div className="absolute-center">
            {toUpperCaseFirstLetter(payload)?.replace("_", " ")}
          </div>
        </div>

        {/* BODY */}
        <div>
          {listGame?.length ? (
            <div className="p-[45px] grid grid-cols-3 min-[600px]:grid-cols-10 gap-4 overflow-auto max-h-[500px]">
              {listGame?.map((e, i) => (
                <div key={i}>
                  <GameItem
                    className={`relative rounded-2xl cursor-pointer select-none group w-[94px] h-[94px]
                        hover:translate-y-[-2px] hover:scale-105 transition-all hover:shadow-xl`}
                    key={e?.id}
                    id={e?.id}
                    index={i}
                    thumbnail={e?.thumbnail}
                    title={e?.title}
                    slug={e?.slug}
                    superSlug={e?.superslug}
                  ></GameItem>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[200px]">
              <Empty />
            </div>
          )}
        </div>
      </>
    </div>
  );
}

export default ListGame;
