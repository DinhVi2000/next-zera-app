/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { IconArrowRight, IconPre } from "@/resources/icons";
import { notifyErrorMessage, toUpperCaseFirstLetter } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import Empty from "../empty/Empty";
import GameItem from "../game/GameItem";
import { getAllGamePlaylist } from "@/services/game.service";
import DetailPlaylist from "./DetailPlaylist";
import { useAuthContext } from "@/context/auth-context";
import { STATUS } from "@/utils/constant";
import { useToast } from "@chakra-ui/react";

function Playlist({ setIsOpenTab, infoList }) {
  const toast = useToast();

  const { activitiesInfo } = useAuthContext();
  const { payload } = infoList;
  const [playlist, setPlaylist] = useState([]);
  const [currentInfo, setCurrentInfo] = useState();
  const [isDetail, setIsDetail] = useState(false);
  const [status, setStatus] = useState(STATUS.NOT_START);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (currentInfo) {
      setIsDetail((value) => !value);
    }
  }, [currentInfo]);

  useEffect(() => {
    if (!isDetail) {
      setCurrentInfo();
    }
  }, [isDetail]);

  const getPlaylist = async () => {
    try {
      if (activitiesInfo?.playlist) {
        if (status === STATUS.SUCCESS) {
          setPlaylist([]);
          Promise.all(
            activitiesInfo?.playlist?.map((e) => {
              getAllGamePlaylist(e?.id).then((data) => {
                setPlaylist((prev) => {
                  return [...prev, { data, info: e }];
                });
              });
            })
          );
          setStatus(STATUS.NOT_START);
        } else {
          Promise.all(
            activitiesInfo?.playlist?.map((e) => {
              getAllGamePlaylist(e?.id).then((data) => {
                setPlaylist((prev) => {
                  return [...prev, { data, info: e }];
                });
              });
            })
          );
        }
      }
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [activitiesInfo?.playlist]);

  return (
    <div className="max-[1178px]:pt-5 max-[990px]:pt-10 max-[650px]:pt-2">
      <div className="bg-[#00000080] rounded-[20px]">
        {isDetail ? (
          <DetailPlaylist
            currentInfo={currentInfo}
            setIsDetail={setIsDetail}
            setStatus={setStatus}
          />
        ) : (
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
              <div className="pt-[45px] px-[45px] pb-[20px] max-[500px]:p-5">
                <div>
                  {playlist?.length > 0 ? (
                    <>
                      {playlist?.map((e, i) => (
                        <div key={i} className="mb-[36px] text-xl">
                          <div className="flex items-center justify-between">
                            {e?.info?.name}
                            <p
                              className="flex-center font-medium cursor-pointer"
                              onClick={() => setCurrentInfo(e?.info)}
                            >
                              View all{" "}
                              <IconArrowRight className="ml-[5px] mb-[2px] w-3 h-3" />
                            </p>
                          </div>

                          <div className="max-[1300px]:w-[830px] max-[1180px]:w-[700px] max-[1026px]:w-[650px] max-[990px]:w-full modal-scroll overflow-x-auto">
                            {e?.data?.length > 0 ? (
                              <div className="p-3 px-1 grid grid-cols-10 gap-x-4 max-[1300px]:gap-x-8 max-h-[500px] w-fit max-[1300px]:w-[990px]">
                                {e?.data?.slice(0, 10)?.map((e, i) => (
                                  <div key={i}>
                                    <GameItem
                                      className={`relative rounded-2xl cursor-pointer select-none group w-[94px] h-[94px]
                        hover:translate-y-[-2px] hover:scale-105 transition-all hover:shadow-xl`}
                                      id={e?.id}
                                      index={i}
                                      thumbnail={e?.thumbnail}
                                      title={e?.title}
                                      slug={e?.slug}
                                      superslug={e?.superslug}
                                    ></GameItem>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="h-[130px]">
                                <Empty />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="h-[130px]">
                      <Empty />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Playlist;
