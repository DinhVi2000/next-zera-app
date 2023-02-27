import { IconCoin, IconPlus, IconEdit } from "@/resources/icons";
import { Tooltip } from "@chakra-ui/react";
import React from "react";

import { useModalContext } from "@/context/modal-context";
import { EDIT_PROFILE_TAB, MODAL_NAME } from "@/utils/constant";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";

function InfoUser() {
  const { openModal, setPayload } = useModalContext();

  const { userInfo } = useAuthContext();
  const { username, quote, avatar, cover, zera } = userInfo || {};

  return (
    <>
      <div className="flex flex-col">
        <Tooltip label="Update cover image" aria-label="A tooltip">
          <div
            className="group cursor-pointer rounded-[20px] relative"
            onClick={() => {
              setPayload(EDIT_PROFILE_TAB.COVER_PAGE),
                openModal(MODAL_NAME.EDIT_PROFILE);
            }}
          >
            <ImageLoading
              alt=""
              className="w-full h-[350px] object-cover rounded-[20px]"
              src={
                cover ||
                "https://img.freepik.com/free-vector/alien-spaceship-flying-cosmos-planets_33099-2480.jpg?w=1380&t=st=1677223897~exp=1677224497~hmac=47243c07b199f051b0b4d45aa862e0130fcecddea16570ed1592b829c11cf16f"
              }
            />
            <div className="hidden group-hover:block rounded-[20px] absolute bottom-0 right-0 z-10 box-border w-full h-full bg-[#00000099]">
              <IconEdit className="absolute-center" />
            </div>
          </div>
        </Tooltip>
        <div className="flex items-end pl-[43px] rounded-[20px] mt-[-100px]">
          <Tooltip label="Update avatar" aria-label="A tooltip">
            <div
              className="group w-[250px] mr-[16px] rounded-[20px] cursor-pointer relative z-10"
              onClick={() => {
                setPayload(EDIT_PROFILE_TAB.AVATAR),
                  openModal(MODAL_NAME.EDIT_PROFILE);
              }}
            >
              <ImageLoading
                alt=""
                src={
                  avatar ||
                  "https://img.freepik.com/premium-vector/cute-animal-design_24911-11520.jpg?w=740"
                }
                className="w-full h-[204px] object-cover rounded-[20px]"
              />
              <div className="hidden group-hover:block rounded-[20px] absolute top-0 z-10 bg-[#00000099] box-border w-full h-full">
                <IconEdit className="absolute-center" />
              </div>
            </div>
          </Tooltip>

          <div className="w-full flex justify-between">
            <div>
              <div
                className="group cursor-pointer relative w-fit"
                onClick={() => {
                  setPayload("AVATAR"), openModal(MODAL_NAME.EDIT_PROFILE);
                }}
              >
                <p className="font-semibold text-[28px]">{username}</p>
                <IconEdit
                  viewBox="0 0 42 42"
                  className="absolute top-[23%] right-[-35px] group-hover:block hidden"
                />
              </div>
              <div
                className="group cursor-pointer relative w-fit"
                onClick={() => {
                  setPayload("AVATAR"), openModal(MODAL_NAME.EDIT_PROFILE);
                }}
              >
                <p className="font-medium">{quote}</p>
                <IconEdit
                  viewBox="0 0 42 42"
                  className="absolute top-[-10%] right-[-35px] group-hover:block hidden"
                />
              </div>
            </div>
            <div className="h-fit px-[10px] py-[6px] flex items-center content-center bg-[#4C1D95] rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer">
              <p className=" font-black text-[24px] mr-[5px]">{zera}</p>
              <IconCoin className="mr-[10px]" />
              <IconPlus />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoUser;
