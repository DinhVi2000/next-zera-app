/* eslint-disable react-hooks/exhaustive-deps */
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
import { getPurchaseHistory, getUserInfo } from "@/services/user.service";
import { useSocketContext } from "@/context/socket-context";
import ButtonLoading from "../loading/ButtonLoading";

const ModalBuy = () => {
  const toast = useToast();
  const { userInfo, usernameAuth, setUserInfo } = useAuthContext();
  const { zera } = userInfo || {};
  const { openModal, payload, setStatus } = useModalContext();
  const { setSocketStatus } = useSocketContext();
  const modal_ref = useRef(null);
  const DURATION = 200;
  const [loading, setLoading] = useState(STATUS.NOT_START);

  const handleCloseModal = () => {
    modal_ref.current.classList?.remove("animation-open-modal");
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useEffect(() => {
    sleep(1).then(() => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  const handleBuy = async () => {
    try {
      setLoading(STATUS.IN_PROGRESS);

      const res = await buyShopItem({
        item: parseInt(payload?.item?.id),
      });

      if (res.success) {
        Promise.all([
          getUserInfo(usernameAuth).then((res) => {
            setUserInfo((prev) => {
              return { ...prev, ...res?.data };
            });
          }),
          getPurchaseHistory().then((data) =>
            setUserInfo((prev) => {
              return { ...prev, purchaseHistory: data };
            })
          ),
        ]);

        setLoading(STATUS.SUCCESS);
        setStatus(STATUS.SUCCESS);
        setSocketStatus(STATUS.SUCCESS);
      }
    } catch (e) {
      setLoading(STATUS.NOT_START);
      setStatus(STATUS.FAIL);
      setSocketStatus(STATUS.FAIL);
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    if (loading === STATUS.SUCCESS) {
      handleCloseModal();
      notifySuccessMessage(toast, "Buy successful");
    }
  }, [loading]);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-[60] text-white bg-[#00000073] flex-center">
      <div
        ref={modal_ref}
        className={`duration-${DURATION} transition-all opacity-5 scale-90 h-fit min-w-[540px] w-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-gradient-to-b from-[#570426] to-[#270010] px-[30px] pb-[20px] max-[576px]:min-w-[90%] max-[576px]:w-[90%] max-[576px]:h-[60vh] overflow-y-scroll modal-scroll`}
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="bg-pink-800 rounded-[10px] mx-auto py-[5px] px-3 text-[28px] text-center font-bold w-fit border-[2px] border-[#EC4899]">
            {payload?.tab}
          </div>
          <button onClick={handleCloseModal}>
            <IconClose className="text-[#F472B6] w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col items-center ">
          <div className="gradient-radius">
            <img
              alt=""
              src={payload?.item?.url}
              className={`w-[204px] h-[204px] object-cover rounded-[20px] ${
                payload?.tab === "Cover Pages" ? "w-[441px]" : ""
              }`}
            />
          </div>
          <p className="font-bold text-base mt-3 mb-2">{payload?.item?.name}</p>
          <div className="flex-center flex-col ">
            <div className="flex font-bold mt-4 mb-5">
              {payload?.item?.price}
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
              hover:bg-[#350F1E] transition-all ml-4 flex-center"
              disabled={loading !== STATUS.NOT_START}
            >
              {loading !== STATUS.NOT_START && <ButtonLoading isLoading />}
              Buy
            </button>
          </div>
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalBuy;
