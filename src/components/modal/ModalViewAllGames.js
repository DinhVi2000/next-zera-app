import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { VIEW_ALL_GAMES_TABS, MODAL_NAME } from "@/utils/constant";
import { sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose } from "@/resources/icons";
import Image from "next/image";
import avaImg from "../../../public/images/ava-user.png";
import lineImg from "../../../public/images/Line.png";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const ModalViewAllGames = () => {
  const { openModal, payload } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 0;
  const [tab, setTab] = useState(payload);

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
      tabName: VIEW_ALL_GAMES_TABS.RECENT_GAMES,
    },
    {
      title: "Loved games",
      tabName: VIEW_ALL_GAMES_TABS.LOVED_GAMES,
    },
    {
      title: "Playlist",
      tabName: VIEW_ALL_GAMES_TABS.PLAYLIST,
    },
    {
      title: "Purchase history ",
      tabName: VIEW_ALL_GAMES_TABS.PURCHASE_HISTORY,
    },
  ];

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 w-fit h-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-black px-[30px] pb-[20px]"
      >
        {tabs?.map(({ title, tabName }, i) => (
          <>
            {tabName === tab && (
              <>
                <div className="flex items-center justify-center mb-[30px]">
                  <div className="text-center text-[40px] mx-auto mt-[27px] font-bold">
                    {title}
                  </div>
                  <button onClick={handleCloseModal}>
                    <IconClose viewBox="0 0 35 35" className="filter-svg" />
                  </button>
                </div>
                <div className="mt-[30px] grid grid-cols-3 min-[600px]:grid-cols-5 gap-4 overflow-auto max-h-[500px] pr-[20px]">
                  {Array(15)
                    .fill(0)
                    .map((e, i) => (
                      <div className="relative group cursor-pointer">
                        <img
                          key={i}
                          alt=""
                          src={
                            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/321478115380977.604d71f1a8580.png"
                          }
                          className="rounded-2xl w-[94px] h-[94px] object-cover max-[752px]:block max-[752px]:mx-auto"
                        ></img>
                        <div className="hidden group-hover:block rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </>
        ))}
      </div>
    </BoxModal>
  );
};

export default ModalViewAllGames;
