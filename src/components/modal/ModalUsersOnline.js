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
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  }, []);

  useEffect(() => {
    sleep(1).then(() => {
      modalTimeRef.current.classList?.add("animation-open-modal");
    });
  }, []);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modalTimeRef}
        className="opacity-5 scale-90 w-fit h-fit daily-bonus p-4 pb-8"
      >
        <div className="flex ">
          <h4 className="mx-auto">Users online</h4>
          <IconClose
            className="cursor-pointer text-[#F472B6] w-5 h-5"
            onClick={() => handleCloseModal()}
          />
        </div>

        {usersInRoom?.rows && usersInRoom.rows.length > 1 ? (
          <div className="grid grid-cols-3 gap-6 mt-10 w-full">
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
                        src={user?.avatar ?? "/avatar-1.svg"}
                      />
                    </div>
                  </div>
                </Link>
              ))}
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
