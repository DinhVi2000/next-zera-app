/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from "react";

import { useModalContext } from "@/context/modal-context";

import { DEFAULT_AVATAR_SRC, MODAL_NAME } from "@/utils/constant";
import { sleep } from "@/utils/helper";

import BoxModal from "./BoxModal";

import { IconClose, IconX } from "@/resources/icons";
import ImageLoading from "../loading/ImageLoading";
import Link from "next/link";
import { dynamicPaths } from "@/utils/$path";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRouter } from "next/router";

const ModalUsersOnline = () => {
  const router = useRouter();

  const { openModal, payload } = useModalContext();

  const modalRef = useRef(null);

  const DURATION = 200;

  const handleCloseModal = () => {
    modalRef.current?.classList?.remove("animation-open-modal");
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  const redirectToAchievementPage = (username) => {
    router.push(dynamicPaths.achievements_by_username(username));
    handleCloseModal();
  };

  useOnClickOutside(modalRef, () => handleCloseModal());

  useEffect(() => {
    sleep(1).then(() => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      modalRef.current.classList?.add("animation-open-modal");
    });
  }, []);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-[60] text-white bg-[#00000073] flex-center">
      <div>
        <header className="flex justify-between p-3 sticky z-30 top-0 w-full">
          <div className="text-white text-xl font-bold bg-title-modal py-[9px] text-center rounded-[14px]  left-1/2 -translate-x-1/2 translate-y-[-10px] absolute w-[238px]">
            All online gamers
          </div>
        </header>
        <div
          ref={modalRef}
          className={`relative duration-${DURATION} transition-all opacity-5 scale-90 w-[392px] border-[5px] border-pink-400 bg-user-online-modal rounded-[20px] max-h-[350px] overflow-y-auto`}
        >
          <section className=" px-[30px] mt-5">
            <div className="py-3 flex flex-col gap-3">
              {payload?.users?.map((e, i) => (
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  key={i}
                  onClick={() => redirectToAchievementPage(e?.username)}
                >
                  <ImageLoading
                    alt={""}
                    className="w-[30px] h-[30px] rounded-full"
                    src={e?.avatar || DEFAULT_AVATAR_SRC}
                  ></ImageLoading>
                  <p className="text-base text-ellipsis overflow-hidden whitespace-nowrap">
                    {e?.username}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalUsersOnline;
