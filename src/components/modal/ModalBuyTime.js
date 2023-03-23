/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { useAuthContext } from "@/context/auth-context";

import { MODAL_NAME, STATUS } from "@/utils/constant";
import {
  notifyErrorMessage,
  notifySuccessMessage,
  sleep,
} from "@/utils/helper";
import BoxModal from "./BoxModal";
import { IconCheckDaily, IconClose } from "@/resources/icons";
import { getUserInfo } from "@/services/user.service";
import { useToast } from "@chakra-ui/react";
import ButtonLoading from "../loading/ButtonLoading";
import { buyShopItem, getItemTime } from "@/services/shop.service";
import { useRouter } from "next/router";
import { useSocketContext } from "@/context/socket-context";
import ImageLoading from "../loading/ImageLoading";
const ModalBuyTime = () => {
  const router = useRouter();
  const toast = useToast();

  const [status, setStatus] = useState(STATUS.NOT_START);
  const [timeItems, setTimeItems] = useState([]);
  const [itemActive, setItemActive] = useState();

  const { setUserInfo, usernameAuth } = useAuthContext();
  const { openModal } = useModalContext();
  const { totalTimePlay, incrementTime } = useSocketContext();

  const modalTimeRef = useRef(null);

  const DURATION = 150;

  const handleCloseModal = () => {
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
    if (
      totalTimePlay - incrementTime < 0 ||
      totalTimePlay - incrementTime === 0
    ) {
      router.push("/");
    }
  };

  useEffect(() => {
    sleep(1).then(() => {
      modalTimeRef.current.classList?.add("animation-open-modal");
    });
  }, []);

  const handleBuyTime = async () => {
    try {
      await buyShopItem({
        item: parseInt(itemActive.id),
      });
      const { data } = await getUserInfo(usernameAuth);
      setUserInfo(data);
      setStatus(STATUS.SUCCESS);
    } catch (e) {
      setStatus(STATUS.FAIL);
      notifyErrorMessage(toast, e);
    }
  };

  const getTimes = async () => {
    const playtimeTtems = await getItemTime();
    if (playtimeTtems) {
      setTimeItems(playtimeTtems);
      setItemActive(playtimeTtems.rows[0]);
    }
  };

  useEffect(() => {
    sleep(1).then(() =>
      modalTimeRef.current.classList?.add("animation-open-modal")
    );
    getTimes();
  }, []);

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      handleCloseModal();
      notifySuccessMessage(
        toast,
        "Congratulations! You have received bonus today"
      );
    }
  }, [status]);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modalTimeRef}
        className="opacity-5 scale-90 w-fit h-fit daily-bonus px-4 py-8 transition-all"
      >
        <div className="flex ">
          <h4 className="mx-auto">Buy Play Time</h4>
          <IconClose
            className="cursor-pointer text-pink-400"
            onClick={handleCloseModal}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5 w-full">
          {timeItems?.rows &&
            timeItems.rows.map((e, i) => (
              <div
                key={i}
                className="overflow-hidden mx-auto w-[160px] h-[160px] daily-bonus__item relative group"
                onClick={() => setItemActive(e)}
              >
                {/* value */}
                <div className="bg-pink-400 text-base px-5 py-2.5 text-center">
                  +{e.value} s
                </div>

                {/* image */}
                <ImageLoading
                  className="w-full h-full object-cover"
                  src={e.url}
                  alt=""
                />

                {/* select bg */}
                {itemActive.id === e.id && (
                  <div className=" bg-[#2b2a2a6d] w-full h-full absolute-center rounded-[20px]">
                    <IconCheckDaily className="absolute-center" />
                  </div>
                )}
              </div>
            ))}

          {!timeItems?.rows &&
            Array(9)
              .fill(0)
              .map((e, i) => (
                <div
                  className="w-[160px] h-[160px] skeleton-shine rounded-[20px]"
                  key={i}
                ></div>
              ))}
        </div>
        <button
          onClick={handleBuyTime}
          className="mx-auto text-base flex-center"
          disabled={status !== STATUS.NOT_START}
        >
          {status !== STATUS.NOT_START && <ButtonLoading isLoading />}
          Buy
        </button>
      </div>
    </BoxModal>
  );
};

export default ModalBuyTime;
