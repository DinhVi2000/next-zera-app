/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";

import { useModalContext } from "@/context/modal-context";
import { useAuthContext } from "@/context/auth-context";

import { MODAL_NAME } from "@/utils/constant";
import { sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";

const ModalResetLogin = () => {

  const { logout } = useAuthContext();
  const modalTimeRef = useRef(null);
  const { openModal } = useModalContext();
  useEffect(() => {
    sleep(1).then(() => {
      modalTimeRef.current.classList?.add("animation-open-modal");
    });
  }, []);

  const handleBackToLogin = () => {
    logout({ isResetLogin: true });
    openModal(MODAL_NAME.NONE);
  };

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modalTimeRef}
        className="opacity-5 rounded-3xl scale-90 w-fit h-fit px-4 py-8 transition-all border-[5px] border-solid border-[#f265e4] relative bg-custom-one shadow-custom-one"
      >
        <div className="flex ">
          <h4 className="mx-auto font-semibold text-3xl">Notify Session</h4>
        </div>
        <div className="flex justify-center items-center my-4">
          <h3 className="text-[22px]"> The account is already logged in on another device, please login again!</h3>
        </div>
        <button
          onClick={handleBackToLogin}
          className="mx-auto text-[26px] font-semibold flex-center absolute p-4 bg-custom-two rounded-3xl shadow-custom-two top-[80%] left-[50%] -translate-x-1/2"
        >
          Back to login
        </button>
      </div>
    </BoxModal>
  );
};

export default ModalResetLogin;
