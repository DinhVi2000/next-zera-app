import { IconCoin, IconPlus, IconEdit } from "@/resources/icons"
import { Tooltip, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"

import Image from "next/image"
import coverImg from "../../../public/images/cover-user.png"
import avaImg from "../../../public/images/ava-user.png"
import { useModalContext } from "@/context/modal-context"
import { MODAL_NAME } from "@/utils/constant"

function InfoUser() {
  const { openModal, setPayload } = useModalContext()

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
            <Image
              alt=""
              className="w-full h-[350px] object-cover rounded-[20px]"
              src={coverImg}
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
              <Image
                alt=""
                src={avaImg}
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
                <p className="font-semibold text-[28px]">Username</p>
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
                <p className="font-medium">
                  User’s quote:Lorem ipsum dolor sit amet consectetur adipiscing
                  elit Ut et.
                </p>
                <IconEdit
                  viewBox="0 0 42 42"
                  className="absolute top-[-10%] right-[-35px] group-hover:block hidden"
                />
              </div>
            </div>
            <div className="h-fit px-[10px] py-[6px] flex items-center content-center bg-[#4C1D95] rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <p className=" font-black text-[24px] mr-[5px]">70</p>
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
