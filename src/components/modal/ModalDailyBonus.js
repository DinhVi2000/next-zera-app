import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";
import { sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";
import { IconCheckDaily, IconCoinDaily } from "@/resources/icons";

const ModalDailyBonus = () => {
  const { openModal, payload } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 0;
  const [tab, setTab] = useState(payload);

  const handleCloseModal = () => {
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 w-fit h-fit daily-bonus p-4 pb-8"
      >
        <h4 className="mx-auto">Daily Gift</h4>
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
                  <p>+{i + 1}</p>
                  <IconCoinDaily />
                </div>
                <div className="hidden group-hover:block bg-[#ffffff6d] w-full h-full absolute-center rounded-[20px]">
                  <IconCheckDaily className="absolute-center" />
                </div>
              </div>
            ))}
        </div>
        <div className="w-full h-[135.7px] mx-auto daily-bonus__item relative group mt-6">
          <div className=" daily-bonus__item-day">Day 8</div>
          <div className="daily-bonus__item-zera w-fit mx-auto">
            <p>+8</p>
            <IconCoinDaily />
          </div>
          <div className="hidden group-hover:block bg-[#ffffff6d] w-full h-full absolute-center rounded-[20px]">
            <IconCheckDaily className="absolute-center" />
          </div>
        </div>
        <button onClick={handleCloseModal} className="mx-auto">
          Claim
        </button>
      </div>
    </BoxModal>
  );
};

export default ModalDailyBonus;
