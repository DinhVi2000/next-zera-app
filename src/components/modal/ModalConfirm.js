import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";
import { sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose } from "@/resources/icons";
import imgRocket from "../../../public/images/icon-reminder.png";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Link from "next/link";
import Image from "next/image";

const ModalConfirm = () => {
  const { openModal } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 0;

  const handleCloseModal = () => {
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useOnClickOutside(modal_ref, handleCloseModal);

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 w-[500px] h-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-black px-[20px] pb-[10px] relative bg-gradient-to-t from-[#740B99] to-[#2F0652]"
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="bg-pink-800 rounded-[20px] mx-auto py-[8px] px-4 text-[25px] text-center font-bold w-fit shadow-md shadow-[#F761D6]">
            REMINDER
          </div>
          <button onClick={handleCloseModal}>
            <IconClose className="text-[#F472B6]"/>
          </button>
        </div>
        <div className="text-[22px] flex-center flex-col">
          <span>
            Please
            <Link
              onClick={handleCloseModal}
              className="text-[#F472B6] text-[25px] hover:underline"
              href="/login"
            >
              {" "}
              Login{" "}
            </Link>
          </span>
          or
          <span>
            {" "}
            <Link
              onClick={handleCloseModal}
              className="text-[#F472B6] text-[25px] hover:underline"
              href="/register"
            >
              {" "}
              Register{" "}
            </Link>{" "}
            to continue!
          </span>
        </div>
        <Image
          src={imgRocket}
          alt=""
          className="w-[200px] h-auto block mx-auto"
        />
      </div>
    </BoxModal>
  );
};

export default ModalConfirm;
