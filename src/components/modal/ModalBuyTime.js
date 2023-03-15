import React, { useCallback, useEffect, useRef, useState } from "react";

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
const ModalBuyTime = () => {
  const router = useRouter();
  const [status, setStatus] = useState(STATUS.NOT_START);
  const [timeItems, setTimeItems] = useState([]);
  const [itemActive, setItemActive] = useState();
  const { setUserInfo, usernameAuth } = useAuthContext();
  const { openModal } = useModalContext();
  const { totalTimePlay, incrementTime } = useSocketContext();
  const modalTimeRef = useRef(null);
  const DURATION = 0;
  const toast = useToast();

  const handleCloseModal = useCallback(
    () => {
      if (totalTimePlay - incrementTime < 0 || totalTimePlay - incrementTime === 0) {
        router.push("/");
      } 
      sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
    },
    [incrementTime, totalTimePlay]
  );

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

  useEffect(() => {
    const getTimes = async () => {
      const playtimeTtems = await getItemTime();
      if (playtimeTtems) {
        setTimeItems(playtimeTtems);
        setItemActive(playtimeTtems.item_details[1]);
      }
    };
    getTimes();
  }, []);

  // useEffect(() => {
  //   console.log(incrementTime, totalTimePlay);
  // }, []);

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
        className="opacity-5 scale-90 w-fit h-fit daily-bonus p-4 pb-8"
      >
        <div className="flex ">
          <h4 className="mx-auto">Buy Play Time</h4>
          <IconClose
            className="cursor-pointer text-[#F472B6]"
            onClick={() => handleCloseModal()}
          />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-10 w-full">
          {timeItems?.item_details &&
            timeItems.item_details.map((e, i) => (
              <div
                key={i}
                className="w-[132.72px] h-[135.7px] mx-auto daily-bonus__item relative group"
                onClick={() => setItemActive(e)}
              >
                <div className="daily-bonus__item-day">
                  <span className="text-xs"> +{e.value} seconds</span>
                </div>
                <div className="daily-bonus__item-zera">
                  <img className="w-16" src={e.url} />
                </div>
                {itemActive.id === e.id && (
                  <div className=" bg-[#2b2a2a6d] w-full h-full absolute-center rounded-[20px]">
                    <IconCheckDaily className="absolute-center" />
                  </div>
                )}
              </div>
            ))}
        </div>
        <button
          onClick={handleBuyTime}
          className="mx-auto flex-center"
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
