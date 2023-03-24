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

  const { userInfo } = useAuthContext();
  const { payload } = infoList;
  const [playlist, setPlaylist] = useState([]);
  const [currentInfo, setCurrentInfo] = useState();
  console.log("currentInfo :", currentInfo);
  const [isDetail, setIsDetail] = useState(false);
  const [status, setStatus] = useState(STATUS.NOT_START);

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
      if (userInfo?.playlist) {
        if (status === STATUS.SUCCESS) {
          setPlaylist([]);
          Promise.all(
            userInfo?.playlist?.map((e) => {
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
            userInfo?.playlist?.map((e) => {
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
  }, [userInfo?.playlist]);

  return (
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
            <div className="pt-[45px] px-[45px] pb-[20px]">
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
                            <IconArrowRight className="ml-[5px] mb-[2px]" />
                          </p>
                        </div>
                        {e?.data?.length > 0 ? (
                          <div className="p-3 px-1 grid grid-cols-3 min-[600px]:grid-cols-10 gap-4 overflow-auto max-h-[500px]">
                            {e?.data?.map((e, i) => (
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
  );
}

export default Playlist;
