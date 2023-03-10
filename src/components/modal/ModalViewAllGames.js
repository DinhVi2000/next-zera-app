import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME, VIEW_ALL_GAMES_TAB } from "@/utils/constant";
import { sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose } from "@/resources/icons";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import GameItem from "../game/GameItem";
import Empty from "../empty/Empty";

const ModalViewAllGames = () => {
  const { openModal, payload } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 0;
  const [tab, setTab] = useState(payload?.payload);

  const handleCloseModal = () => {
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useOnClickOutside(modal_ref, handleCloseModal);

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  const tabs = [
    {
      title: "Recent games",
      tabName: VIEW_ALL_GAMES_TAB.RECENT_GAMES,
    },
    {
      title: "Loved games",
      tabName: VIEW_ALL_GAMES_TAB.LOVED_GAMES,
    },
    {
      title: "Playlist",
      tabName: VIEW_ALL_GAMES_TAB.PLAYLIST,
    },
  ];

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 w-fit h-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col px-[30px] pb-[20px] bg-gradient-to-b from-[#580023] to-[#130023]  max-[500px]:px-4 max-[500px]:w-full"
      >
        {tabs?.map(({ title, tabName }, i) => (
          <>
            {tabName === tab && (
              <>
                <div
                  className="flex items-center justify-center mb-[30px]"
                  key={i}
                >
                  <div className="text-center text-[40px] mx-auto mt-[27px] font-bold max-[500px]:text-2xl">
                    {title}
                  </div>
                  <button onClick={handleCloseModal}>
                    <IconClose viewBox="0 0 35 35" className="filter-svg" />
                  </button>
                </div>

                {payload?.listGame?.length ? (
                  <div className="p-[20px] grid grid-cols-3 min-[600px]:grid-cols-5 gap-4 overflow-auto max-h-[500px]">
                    {payload?.listGame?.map((e, i) => (
                      <>
                        <GameItem
                          onClick={handleCloseModal}
                          className={`relative rounded-2xl cursor-pointer select-none group w-[94px] h-[94px]
                        hover:translate-y-[-2px] hover:scale-105 transition-all hover:shadow-xl`}
                          key={e?.id}
                          id={e?.id}
                          index={i}
                          thumbnail={e?.thumbnail}
                          title={e?.title}
                        ></GameItem>
                      </>
                    ))}
                  </div>
                ) : (
                  <div className="w-[400px] h-[200px] max-[500px]:w-full">
                    <Empty />
                  </div>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </BoxModal>
  );
};

export default ModalViewAllGames;
