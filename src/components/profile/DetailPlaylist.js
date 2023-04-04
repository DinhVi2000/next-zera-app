/* eslint-disable react-hooks/exhaustive-deps */
import { useModalContext } from "@/context/modal-context";
import {
  IconClose,
  IconDelItem,
  IconDelPlay,
  IconPre,
  IconTrash,
} from "@/resources/icons";
import {
  deleteGamePlaylist,
  getAllGamePlaylist,
  getAllPlaylist,
} from "@/services/game.service";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import React, { useEffect, useRef, useState } from "react";
import Empty from "../empty/Empty";
import GameItem from "../game/GameItem";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { notifyErrorMessage } from "@/utils/helper";
import { Tooltip, useToast } from "@chakra-ui/react";
import { useAuthContext } from "@/context/auth-context";

function DetailPlaylist({ currentInfo, setIsDetail, setStatus, status }) {
  const toast = useToast();
  const { setActivitiesInfo } = useAuthContext();

  const { openModal, setPayload } = useModalContext();
  const [showMenu, setShowMenu] = useState(false);
  const [showDelItem, setShowDelItem] = useState(false);
  const [listGame, setListGame] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setShowMenu(false);
  };
  const modal_ref = useRef(null);
  useOnClickOutside(modal_ref, handleCloseModal);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (!currentInfo?.name && status === STATUS.SUCCESS) {
      setIsDetail(false);
    }
  }, [currentInfo]);

  const handleDelItem = async (id) => {
    try {
      const data = await deleteGamePlaylist(id);
      if (data.success) {
        getAllPlaylist().then((data) =>
          setActivitiesInfo((prev) => {
            return { ...prev, playlist: data };
          })
        );
        setStatus(STATUS.SUCCESS);
        setShowDelItem(false);
        handleGetAllGame();
      }
    } catch (e) {
      setStatus(STATUS.FAIL);
      notifyErrorMessage(toast, e);
    }
  };

  const handleGetAllGame = async () => {
    try {
      setLoading(true);
      const data = await getAllGamePlaylist(currentInfo?.id);
      setListGame(data);
      setLoading(false);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    handleGetAllGame();
  }, []);

  return (
    <div>
      {/* TITLE */}
      <div className="rounded-t-[20px] bg-[#EC4899] p-[16px] max-[612px]:px-[5px] text-[28px] font-bold relative flex items-center justify-between">
        <div
          className="flex-center text-2xl cursor-pointer max-[1184px]:text-xl max-[612px]:text-base"
          onClick={() => setIsDetail(false)}
        >
          <IconPre className="mr-1" />
          Back
        </div>
        <div className="absolute-center flex-center max-[1184px]:text-xl max-[612px]:text-base">
          Playlist
          <Tooltip label={currentInfo?.name}>
            <p className="w-[210px] max-[732px]:w-[120px] max-[612px]:w-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
              /{currentInfo?.name}
            </p>
          </Tooltip>
        </div>

        <div className="relative">
          <IconTrash
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowMenu((value) => !value)}
          />
          {showMenu && (
            <div
              className="absolute top-12 right-0 border-[1px] border-[#DB2777] bg-[#000000dc] rounded-[15px] w-[180px] p-2 text-base"
              ref={modal_ref}
            >
              <button
                className="rounded-[10px] cursor-pointer px-2 hover:bg-[#DB2777] flex items-center h-[46px] w-full"
                onClick={() => {
                  setPayload({ currentInfo, setIsDetail, setStatus }),
                    openModal(MODAL_NAME.DELETE_PLAYLIST);
                }}
              >
                <IconDelPlay className="mr-2" />
                Delete Playlist
              </button>
              <button
                className={`rounded-[10px] cursor-pointer px-2 flex items-center h-[46px] w-full ${
                  showDelItem ? "bg-[#DB2777] " : ""
                } ${listGame?.length ? "hover:bg-[#DB2777]" : ""}`}
                onClick={() => {
                  setShowDelItem((value) => !value);
                }}
                disabled={!listGame?.length}
              >
                <IconDelItem className="mr-2" />
                Delete Item
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        {loading ? (
          <div className="p-5">
            <div className="flex flex-wrap gap-5">
              {Array(6)
                .fill(0)
                ?.map((e, i) => (
                  <div
                    key={i}
                    className="skeleton-shine w-[94px] h-[94px] rounded-[15px] opacity-40"
                  ></div>
                ))}
            </div>
          </div>
        ) : (
          <>
            {listGame?.length > 0 ? (
              <>
                <div className="p-[45px] max-[500px]:p-5 max-[600px]:justify-center flex flex-wrap gap-4 overflow-auto max-h-[500px] modal-scroll">
                  {listGame?.map((e, i) => (
                    <div key={i} className="relative">
                      <GameItem
                        className={`relative rounded-2xl cursor-pointer select-none group w-[94px] h-[94px]
                        hover:translate-y-[-2px] hover:scale-105 transition-all hover:shadow-xl`}
                        key={e?.id}
                        id={e?.id}
                        index={i}
                        thumbnail={e?.thumbnail}
                        title={e?.title}
                        slug={e?.slug}
                        superslug={e?.superslug}
                      ></GameItem>
                      {showDelItem && (
                        <div className="absolute left-0 top-0 w-[94px] h-full bg-[#00000083] z-10 rounded-[15px]">
                          <IconClose
                            className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
                            onClick={() => handleDelItem(e?.id)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-[200px]">
                <Empty />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DetailPlaylist;
