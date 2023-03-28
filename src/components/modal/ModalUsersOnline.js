/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from "react";
import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";
import { sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";
import { IconClose } from "@/resources/icons";
import { useSocketContext } from "@/context/socket-context";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";

const ModalUsersOnline = () => {
  const { usersInRoom } = useSocketContext();
  const { openModal } = useModalContext();
  const modalTimeRef = useRef(null);
  const DURATION = 0;
  const { userInfo } = useAuthContext();
  const handleCloseModal = useCallback(() => {
    modalTimeRef.current.classList?.remove("animation-open-modal");
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  }, []);

  useEffect(() => {
    sleep(1).then(() => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      modalTimeRef.current.classList?.add("animation-open-modal");
    });
  }, []);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modalTimeRef}
        className="opacity-5 scale-90 md:w-fit md:h-fit  daily-bonus p-4 pb-8 transition-all w-[340px]"
      >
        <div className="flex ">
          <h4 className="mx-auto">Users online</h4>
          <IconClose
            className="cursor-pointer text-[#F472B6] w-5 h-5"
            onClick={() => handleCloseModal()}
          />
        </div>

        {usersInRoom?.rows && usersInRoom.rows.length > 1 ? (
          <div className="overflow-y-auto max-h-[436px] md:max-h-[500px] md:m-4 mt-5">
            <div className="grid md:grid-cols-3 grid-cols-2 gap-2 md:gap-6 w-full">
              {usersInRoom.rows
                .filter((userF) => userF.id !== userInfo?.id)
                .map((user, i) => (
                  <Link
                    href={`/hall-of-fame/${user.username}`}
                    key={i}
                    target="_blank"
                  >
                    <div className="w-[132.72px] h-[135.7px] mx-auto daily-bonus__item group">
                      <div className="flex justify-center p-1 border-b-[1px] border-[#fff]">
                        <span className="text-xs"> {user.username} </span>
                      </div>
                      <div className="overflow-hidden w-full h-[calc(100%-2rem)] p-2 rounded-xl">
                        <ImageLoading
                          alt=""
                          className="w-full h-full object-cover rounded-xl"
                          src={user?.avatar?.url ?? "/avatar-1.svg"}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h2> No one in the room </h2>
          </div>
        )}
      </div>
    </BoxModal>
  );
};

export default ModalUsersOnline;
