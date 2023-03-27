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
import { IconClose, IconCoin22 } from "@/resources/icons";
import { getUserInfo } from "@/services/user.service";
import { useToast } from "@chakra-ui/react";
import { buyShopItem, getItemTime } from "@/services/shop.service";
import { useRouter } from "next/router";
import { useSocketContext } from "@/context/socket-context";
import ImageLoading from "../loading/ImageLoading";
const ModalBuyTime = () => {
  const router = useRouter();
  const toast = useToast();

  const [status, setStatus] = useState(STATUS.NOT_START);
  const [timeItems, setTimeItems] = useState([]);
  const { setUserInfo, usernameAuth } = useAuthContext();
  const { openModal } = useModalContext();
  const { stopGame } = useSocketContext();
  const modalTimeRef = useRef(null);

  const DURATION = 150;

  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
    router.push("/");
  };

  useEffect(() => {
    sleep(1).then(() => {
      modalTimeRef.current.classList?.add("animation-open-modal");
    });
  }, []);

  const handleBuyTime = async (id) => {
    try {
      await buyShopItem({
        item: parseInt(id),
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
    }
  };

  useEffect(() => {
    sleep(1).then(() => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      modalTimeRef.current.classList?.add("animation-open-modal");
    });
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

  useEffect(() => {
    stopGame();
  }, []);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modalTimeRef}
        className="opacity-5 scale-90 md:w-fit md:h-fit daily-bonus md:px-4 px-1 py-8 transition-all w-[340px]"
      >
        <div className="flex">
          <h4 className="mx-auto">Buy Play Time</h4>
          <IconClose
            className="cursor-pointer text-pink-400 w-5"
            onClick={handleCloseModal}
          />
        </div>
        <div className="overflow-y-auto max-h-[436px] md:max-h-[500px] md:m-4 mt-5">
          <div className="grid md:grid-cols-3 md:gap-4 grid-cols-2 gap-2 md:mx-2 md:w-[600px] w-[310px] ml-[6px]">
            {timeItems?.rows &&
              timeItems.rows.map((e, i) => (
                <div
                  key={i}
                  className="overflow-hidden mx-auto  md:w-[190px] daily-bonus__item relative group"
                >
                  {/* value */}
                  <div className="bg-pink-400 text-base px-5 py-2.5 text-center flex justify-center md:flex-row flex-col">
                    <p> +{e.value}s</p>
                    <p className="hidden md:block mx-1"> / </p>
                    <p className="flex justify-center items-center"> <strong className="mr-1">{e.price} </strong> <IconCoin22 /></p>
                  </div>

                  {/* image */}
                  <ImageLoading
                    className="object-cover"
                    src={e.url}
                    alt=""
                  />

                  {/* select bg */}
                  <div className=" w-full h-full absolute-center rounded-[20px]">
                    <div className="py-2 px-4 bg-pink-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-custom-one group-hover:top-1/2 group-hover:opacity-100 transition-all opacity-0 duration-300 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                      onClick={() => handleBuyTime(e.id)}
                    >
                      Buy
                    </div>
                  </div>
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
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalBuyTime;
