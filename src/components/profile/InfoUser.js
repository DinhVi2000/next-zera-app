import { IconCoin, IconPlus, IconEdit } from "@/resources/icons"
import { Tooltip, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"

import Image from "next/image"
import coverImg from "../../../public/images/cover-user.png"
import avaImg from "../../../public/images/ava-user.png"
import { useModalContext } from "@/context/modal-context"
import { MODAL_NAME } from "@/utils/constant"
import { useAuthContext } from "@/context/auth-context"

function InfoUser() {
  const { openModal, setPayload } = useModalContext()

  const { userInfo } = useAuthContext()
  const { username, quote, avatar, cover, zera } = userInfo || {}

  return (
    <>
      <div className="flex flex-col">
        <Tooltip label="Update cover image" aria-label="A tooltip">
          <div
            className="group cursor-pointer rounded-[20px] relative"
            onClick={() => {
              setPayload("COVER_PAGE"), openModal(MODAL_NAME.EDIT_PROFILE)
            }}
          >
            <img
              alt=""
              className="w-full h-[350px] object-cover rounded-[20px]"
              src={cover}
            />
            <div className="hidden group-hover:block rounded-[20px] absolute top-0 z-10 bg-[#00000099] box-border w-full h-full">
              <IconEdit className="absolute-center" />
            </div>
          </div>
        </Tooltip>
        <div className="flex items-end pl-[43px] rounded-[20px] mt-[-100px]">
          <Tooltip label="Update avatar" aria-label="A tooltip">
            <div
              className="group w-[250px] mr-[16px] rounded-[20px] cursor-pointer relative z-10"
              onClick={() => {
                setPayload("AVATAR"), openModal(MODAL_NAME.EDIT_PROFILE)
              }}
            >
              <img
                alt=""
                src={avatar}
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
                  setPayload("AVATAR"), openModal(MODAL_NAME.EDIT_PROFILE)
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
                  setPayload("AVATAR"), openModal(MODAL_NAME.EDIT_PROFILE)
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
  )
}

export default InfoUser
