/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import { notifyErrorMessage, sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";

import { useToast } from "@chakra-ui/react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { useAuthContext } from "@/context/auth-context";
import { deletePlaylist, getAllPlaylist } from "@/services/game.service";

const ModalDeletePlaylist = () => {
  const { setUserInfo } = useAuthContext();

  const toast = useToast();
  const { openModal, payload } = useModalContext();

  const modal_ref = useRef(null);
  const DURATION = 200;

  const handleCloseModal = () => {
    modal_ref?.current?.classList?.remove("animation-open-modal");
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useOnClickOutside(modal_ref, handleCloseModal);

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref?.current?.classList?.add("animation-open-modal");
    });
  }, []);

  const handleDeletePlaylist = async () => {
    try {
      const data = await deletePlaylist(payload?.currentInfo?.id);
      if (data?.success) {
        getAllPlaylist().then((data) =>
          setUserInfo((prev) => {
            return { ...prev, playlist: data };
          })
        ),
          openModal(MODAL_NAME.NONE);
        payload?.setIsDetail(false);
        payload?.setStatus(STATUS.SUCCESS);
      }
    } catch (e) {
      payload?.setStatus(STATUS.NOT_START);
      notifyErrorMessage(toast, e);
    }
  };

  return (
    <BoxModal className="fixed h-[100vh] w-full z-[60] text-white bg-[#00000073] flex-center">
      <div
        ref={modal_ref}
        className={`relative duration-${DURATION} transition-all opacity-5 scale-90 max-h-[450px] h-fit w-[540px] border-[5px] border-[#F472B6] rounded-[30px] flex-center flex-col bg-[#831843] p-[20px] max-[550px]:min-w-full`}
      >
        <h4 className="text-2xl font-bold">Delete Playlist</h4>
        <p className="text-lg font-bold my-3">Are you sure ?</p>
        <div className="flex items-center my-2">
          <button
            onClick={handleCloseModal}
            className="bg-[#6D28D9] border-[1px] border-[#fff] rounded-[30px] w-[71px] h-[32px] flex-center mx-2"
          >
            No
          </button>
          <button
            className="border-[1px] border-[#fff] rounded-[30px] w-[71px] h-[32px] flex-center mx-2"
            onClick={() => handleDeletePlaylist()}
          >
            Yes
          </button>
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalDeletePlaylist;
