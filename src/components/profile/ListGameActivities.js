/* eslint-disable indent */
import React from "react";

import { IconArrowRight, IconConsole } from "@/resources/icons";
import ImageLoading from "../loading/ImageLoading";
import GameItem from "../game/GameItem";
import { toUpperCaseFirstLetter } from "@/utils/helper";
import Empty from "../empty/Empty";
import { Tooltip, useMediaQuery } from "@chakra-ui/react";

function ListGameActivities({ payload, listGame, setInfoList, setIsOpenTab }) {
  const matchesThan1540 = useMediaQuery("(max-width: 1540px)");
  const matchesThan1320 = useMediaQuery("(max-width: 1320px)");
  const matchesThan1100 = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <div className="w-full min-[1200px]:px-5 px-[42px] max-[1000px]:px-2 mt-[30px] max-[776px]:px-[10px] max-[990px]:pl-[70px] max-[780px]:pl-[20px] max-[990px]:pr-[30px]">
        <div className="flex justify-between w-full mb-[16px]">
          <h4 className="text-[24px] font-bold">
            {toUpperCaseFirstLetter(payload?.replace("_", " "))}
          </h4>
          <p
            className="flex items-center font-medium cursor-pointer"
            onClick={() => {
              setInfoList({ payload, listGame });
              setIsOpenTab(true);
            }}
          >
            View all <IconArrowRight className="ml-[5px] mb-[2px]" />
          </p>
        </div>
        <div>
          {payload !== "PLAYLIST" ? (
            <>
              {payload?.includes("PURCHASE_HISTORY") ? (
                <>
                  {listGame?.avatar?.length > 0 ||
                  listGame?.cover?.length > 0 ? (
                    <>
                      <div className="overflow-x-scroll max-[700px]:w-full modal-scroll">
                        <div className="responsive-grid modal-scroll">
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
                <div className="overflow-x-scroll max-[700px]:w-full modal-scroll">
                  {listGame?.length > 0 ? (
                    <div className="responsive-grid modal-scroll">
                      {listGame?.slice(0, 6)?.map((e, i) => (
                        <GameItem
                          key={e?.id}
                          id={e?.id}
                          index={i}
                          thumbnail={e?.thumbnail}
                          title={e?.title}
                          slug={e?.slug}
                          superslug={e?.superslug}
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
            </>
          ) : (
            <>
              {listGame?.length > 0 ? (
                <div className="overflow-x-scroll max-[700px]:w-full modal-scroll">
                  <div className="flex items-center gap-x-[20px] px-2 max-[700px]:w-[600px]">
                    {listGame
                      ?.slice(
                        0,
                        matchesThan1100[0]
                          ? 3
                          : matchesThan1320[0]
                          ? 2
                          : matchesThan1540[0]
                          ? 3
                          : 4
                      )
                      ?.map((e, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-end border-[3px] border-[#F472B6] rounded-[10px] h-[92px] w-[190px] relative pr-2"
                        >
                          {e?.thumbnail ? (
                            <ImageLoading
                              src={e?.thumbnail}
                              alt=""
                              className="w-[94px] h-[94px] object-cover rounded-[20px] absolute left-[-10px] top-[50%] translate-x-0 translate-y-[-50%]"
                            />
                          ) : (
                            <IconConsole className="w-14 h-14 mx-auto" />
                          )}
                          <Tooltip label={e?.name}>
                            <div className="text-xl w-[50%] text-ellipsis overflow-hidden whitespace-nowrap text-center">
                              {e?.name}
                              {/* <p
                              className="flex-center font-medium cursor-pointer text-sm"
                              onClick={() => {
                                setInfoList({ payload });
                                setIsOpenTab(true);
                              }}
                            >
                              View allcc{" "}
                              <IconArrowRight className="ml-[5px] mb-[2px]" />
                            </p> */}
                            </div>
                          </Tooltip>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="h-[130px]">
                  <Empty />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ListGameActivities;
