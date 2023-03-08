/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import {
  notifyErrorMessage,
  notifySuccessMessage,
  sleep,
} from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose, IconCoin22 } from "@/resources/icons";

import { useToast } from "@chakra-ui/react";
import { buyShopItem } from "@/services/shop.service";
import { useAuthContext } from "@/context/auth-context";
import { getUserInfo } from "@/services/user.service";

const ModalBuy = () => {
  const toast = useToast();
  const { userInfo, usernameAuth, setUserInfo } = useAuthContext();
  const { zera } = userInfo || {};
  const { openModal, payload, setStatus } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 200;
  const [itemShop, setItemShop] = useState(payload?.item);

  const handleCloseModal = () => {
    modal_ref.current.classList?.remove("animation-open-modal");
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  const handleBuy = async () => {
    try {
      const res = await buyShopItem({
        item: parseInt(itemShop.id),
      });
      if (!res.success) {
        throw new Error(data?.message);
      }
      const { data } = await getUserInfo(usernameAuth);
      setUserInfo(data);
      notifySuccessMessage(toast, "Buy successful");
      handleCloseModal();
      setStatus(STATUS.SUCCESS);
    } catch (e) {
      setStatus(STATUS.FAIL);
      notifyErrorMessage(toast, e);
    }
  };

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] flex-center">
      <div
        ref={modal_ref}
        className={`duration-${DURATION} transition-all opacity-5 scale-90 h-fit min-w-[540px] w-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-gradient-to-b from-[#570426] to-[#270010] px-[30px] pb-[20px]`}
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="bg-pink-800 rounded-[10px] mx-auto py-[5px] text-[28px] text-center font-bold w-[109px] border-[2px] border-[#EC4899]">
            BUY
          </div>
          <button onClick={handleCloseModal}>
            <IconClose />
          </button>
        </div>
        <div className="flex flex-col items-center ">
          <div className="gradient-radius">
            <img
              alt=""
              src={itemShop?.url}
              className={`w-[204px] h-[204px] object-cover rounded-[20px] ${
                payload?.tab === "Cover Pages" ? "w-[441px]" : ""
              }`}
            />
          </div>
          <p className="font-bold text-base mt-3 mb-2">{itemShop?.name}</p>
          <div className="flex-center flex-col ">
            <div className="flex font-bold mt-4 mb-5">
              {itemShop?.price}
              <IconCoin22 className="ml-2" />
            </div>
            <div className="flex mb-4">
              <p>Balance: </p>
              <div className="flex ml-3">
                {zera}
                <IconCoin22 className="ml-1" />
              </div>
            </div>
            <button
              onClick={handleBuy}
              className="bg-violet-700 px-[25px] py-[5px] rounded-[30px] border border-[#F5F3FF] font-medium
              hover:bg-[#350F1E] transition-all ml-4"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalBuy;
