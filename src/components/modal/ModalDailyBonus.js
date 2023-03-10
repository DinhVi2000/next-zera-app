import React, { useEffect, useRef } from "react";

import { useModalContext } from "@/context/modal-context";
import { useAuthContext } from "@/context/auth-context";

import { MODAL_NAME } from "@/utils/constant";
import {
  notifyErrorMessage,
  notifySuccessMessage,
  sleep,
} from "@/utils/helper";
import BoxModal from "./BoxModal";
import { IconCheckDaily, IconClose, IconCoinDaily } from "@/resources/icons";
import { claimDailyBonus, getUserInfo } from "@/services/user.service";
import { useToast } from "@chakra-ui/react";

const ModalDailyBonus = () => {
  const { userInfo, setUserInfo, usernameAuth } = useAuthContext();
  const { openModal } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 0;
  const toast = useToast();

  const handleCloseModal = () => {
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  const handleClaim = async () => {
    try {
      const { data } = await claimDailyBonus();
      if (data) {
        notifySuccessMessage(
          toast,
          "Congratulations! You have received bonus today"
        );
        const res = await getUserInfo(usernameAuth);
        setUserInfo(res?.data);
        handleCloseModal();
      }
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 w-fit h-fit daily-bonus p-4 pb-8"
      >
        <div className="flex ">
          <h4 className="mx-auto">Daily Gift</h4>
          <IconClose className="cursor-pointer " onClick={handleCloseModal} />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-10 w-full">
          {Array(6)
            .fill(0)
            .map((e, i) => (
              <div
                key={i}
                className="w-[132.72px] h-[135.7px] mx-auto daily-bonus__item relative group"
              >
                <div className=" daily-bonus__item-day">Day {i + 1}</div>
                <div className="daily-bonus__item-zera">
                  <p>+{i + 1 > 3 ? i + 2 : i + 1}</p>
                  <IconCoinDaily />
                </div>
                {i < userInfo?.playstreak && (
                  <div className=" bg-[#2b2a2a6d] w-full h-full absolute-center rounded-[20px]">
                    <IconCheckDaily className="absolute-center" />
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="w-full h-[135.7px] mx-auto daily-bonus__item relative group mt-6">
          <div className=" daily-bonus__item-day">
            Day&nbsp;
            {userInfo?.playstreak >= 8 ? userInfo?.playstreak + 1 : "7"}
          </div>
          <div className="daily-bonus__item-zera w-fit mx-auto">
            <p>+10</p>
            <IconCoinDaily />
          </div>
        </div>
        <button onClick={handleClaim} className="mx-auto">
          Claim
        </button>
      </div>
    </BoxModal>
  );
};

export default ModalDailyBonus;
