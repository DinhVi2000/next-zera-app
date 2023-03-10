import React from "react";

import { useModalContext } from "@/context/modal-context";

import { IconArrowRight } from "@/resources/icons";
import ImageLoading from "../loading/ImageLoading";
import GameItem from "../game/GameItem";
import { toUpperCaseFirstLetter } from "@/utils/helper";
import Empty from "../empty/Empty";

function ListGameActivities({ payload, isModal, listGame }) {
  const { openModal, setPayload } = useModalContext();

  return (
    <>
      <div className="w-full px-[42px] max-[1000px]:px-2 mt-[30px]">
        <div className="flex justify-between w-full mb-[16px]">
          <h4 className="text-[24px] font-bold">
            {toUpperCaseFirstLetter(payload?.replace("_", " "))}
          </h4>
          <p
            className="flex items-center font-medium cursor-pointer"
            onClick={() => {
              setPayload({ payload, listGame }), openModal(isModal);
            }}
          >
            View all <IconArrowRight className="ml-[5px] mb-[2px]" />
          </p>
        </div>
        <div>
          {payload?.includes("PURCHASE_HISTORY") ? (
            <>
              {listGame?.avatar?.length > 0 || listGame?.cover?.length > 0 ? (
                <>
                  <div className="responsive-grid">
                    {listGame?.avatar?.slice(0, 6)?.map((e, i) => (
                      <div
                        className="w-[94px] h-[94px] hover:scale-[1.1] transition-all"
                        key={i}
                      >
                        <ImageLoading
                          alt=""
                          src={e?.url}
                          className="w-full h-full rounded-[10px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-x-[16px] mt-3">
                    {listGame?.cover?.slice(0, 3)?.map((e, i) => (
                      <div
                        className="w-[204px] h-[94px] hover:scale-[1.1] transition-all"
                        key={i}
                      >
                        <ImageLoading
                          alt=""
                          src={e?.url}
                          className="w-full h-full rounded-[10px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-[130px]">
                  <Empty />
                </div>
              )}
            </>
          ) : (
            <div>
              {listGame?.length > 0 ? (
                <div className="responsive-grid">
                  {listGame?.slice(0, 6)?.map((e, i) => (
                    <GameItem
                      key={e?.id}
                      id={e?.id}
                      index={i}
                      thumbnail={e?.thumbnail}
                      title={e?.title}
                    ></GameItem>
                  ))}
                </div>
              ) : (
                <div className="h-[130px]">
                  <Empty />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListGameActivities;
