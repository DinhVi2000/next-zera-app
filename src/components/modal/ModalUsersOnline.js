/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from "react";

import { useModalContext } from "@/context/modal-context";

import { MODAL_NAME } from "@/utils/constant";
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
      <div
        ref={modalRef}
        className={`relative duration-${DURATION} transition-all opacity-5 scale-90 w-[200px] h-[250px] border border-pink-400 rounded-lg bg-[#1E1E1E] overflow-y-auto`}
      >
        <header className="flex justify-between p-3 border-[#313131] border-b-[1px] sticky top-0 w-full bg-[#1E1E1E]">
          <h2 className="text-pink-500 font-bold">All gamers</h2>

          <button onClick={handleCloseModal}>
            <IconClose className="w-3 h-3" />
          </button>
        </header>
        <section>
          <div className="p-3 flex flex-col gap-3">
            {Object.values(payload?.users || {}).map((e, i) => (
              <div
                className="flex gap-2 items-center cursor-pointer"
                key={i}
                onClick={() => redirectToAchievementPage(e?.username)}
              >
                <ImageLoading
                  alt={""}
                  className="w-6 h-6 rounded-full"
                  src={""}
                ></ImageLoading>
                <p className="text-sm">{e?.username}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </BoxModal>
  );
};

export default ModalUsersOnline;
