/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";
import { sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";

import { useRouter } from "next/router";
import { IconArrowLeft } from "@/resources/icons";

const ModalResetLogin = () => {
  const router = useRouter();
  const modalTimeRef = useRef(null);
  const { openModal } = useModalContext();

  const handleCloseModal = () => {
    modalTimeRef.current.classList?.remove("animation-open-modal");
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    sleep(200).then(() => openModal(MODAL_NAME.NONE));
  };

  useEffect(() => {
    sleep(1).then(() => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      modalTimeRef.current.classList?.add("animation-open-modal");
    });
  }, []);

  const handleBackToHome = () => {
    modalTimeRef.current.classList?.remove("animation-open-modal");
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    router.replace("/");
    openModal(MODAL_NAME.NONE);
  };

  return (
    <BoxModal className="fixed h-[100vh] max-[597px]:h-[60vh] w-full z-50 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modalTimeRef}
        className="max-[597px]:w-[80%] opacity-5 rounded-3xl scale-90 max-w-[540px] w-fit h-fit px-6 pb-10 pt-6 max-[597px]:px-1 transition-all border-[5px] border-solid border-[#F472B6] relative bg-black bg-reset"
      >
        <div className="flex justify-center items-center my-8 mx-8">
          <h3 className="text-[28px] font-bold text-center max-[597px]:text-[22px]">
            Can not play the game on multiple devices
          </h3>
        </div>
        <div className="flex-center max-[597px]:flex-col-reverse">
          <button
            onClick={handleCloseModal}
            className="mx-auto px-6 py-2 text-[20px] max-[597px]:text-base max-[597px]:mb-4 font-semibold flex-center rounded-3xl bg-[#DB2777] border-[3px] border-[#DB2777] hover:bg-[#00000000]"
          >
            OK
          </button>
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalResetLogin;
