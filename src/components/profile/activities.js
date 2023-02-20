import React from "react"

import { IconArrowRight } from "@/resources/icons"
import Image from "next/image"
import imgGame from "../../../public/images/game.png"

import { useModalContext } from "@/context/modal-context"
import { MODAL_NAME } from "@/utils/constant"

function Activities() {
  const { openModal, setPayload } = useModalContext()

  return (
    <div className="w-[70%] bg-[#000000cc] rounded-[20px] flex flex-col items-center justify-center pt-[22px] pb-[100px]">
      <h2 className="text-[32px] mb-[30px] font-bold">Activities</h2>
      <h3 className="text-[28px] font-bold">Most played</h3>
      <Image
        alt=""
        src={imgGame}
        width="314"
        height="204"
        className="rounded-[10px]"
      />
      <div className="w-full px-[20px] mt-[30px]">
        <div className="flex justify-between w-full">
          <h4 className="text-[24px] font-bold mb-[16px]">Recent games</h4>
          <p
            className="flex items-center font-medium cursor-pointer"
            onClick={() => {
              setPayload("RECENT_GAMES"), openModal(MODAL_NAME.VIEW_ALL_GAMES)
            }}
          >
            View all <IconArrowRight className="ml-[5px] mb-[2px]" />
          </p>
        </div>
        <div className="responsive-grid">
          {Array(6)
            .fill(0)
            .map((e, i) => (
              <div
                className="w-[94px] h-[94px] hover:scale-[1.1] transition-all"
                key={i}
              >
                <Image
                  alt=""
                  src={imgGame}
                  className="w-full h-full rounded-[10px] object-cover"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="w-full px-[20px] mt-[30px]">
        <div className="flex justify-between w-full">
          <h4 className="text-[24px] font-bold mb-[16px]">Loved games</h4>
          <p
            className="flex items-center font-medium cursor-pointer"
            onClick={() => {
              setPayload("LOVED_GAMES"), openModal(MODAL_NAME.VIEW_ALL_GAMES)
            }}
          >
            View all <IconArrowRight className="ml-[5px] mb-[2px]" />
          </p>
        </div>
        <div className="responsive-grid">
          {Array(6)
            .fill(0)
            .map((e, i) => (
              <div
                className="w-[94px] h-[94px] hover:scale-[1.1] transition-all"
                key={i}
              >
                <Image
                  alt=""
                  src={imgGame}
                  className="w-full h-full rounded-[10px] object-cover"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="w-full px-[20px] mt-[30px]">
        <div className="flex justify-between w-full">
          <h4 className="text-[24px] font-bold mb-[16px]">Playlist</h4>
          <p
            className="flex items-center font-medium cursor-pointer"
            onClick={() => {
              setPayload("PLAYLIST"), openModal(MODAL_NAME.VIEW_ALL_GAMES)
            }}
          >
            View all <IconArrowRight className="ml-[5px] mb-[2px]" />
          </p>
        </div>
        <div className="responsive-grid">
          {Array(6)
            .fill(0)
            .map((e, i) => (
              <div
                className="w-[94px] h-[94px] hover:scale-[1.1] transition-all"
                key={i}
              >
                <Image
                  alt=""
                  src={imgGame}
                  className="w-full h-full rounded-[10px] object-cover"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="w-full px-[20px] mt-[30px]">
        <div className="flex justify-between w-full">
          <h4 className="text-[24px] font-bold mb-[16px]">Purchase history</h4>
          <p
            className="flex items-center font-medium cursor-pointer"
            onClick={() => {
              setPayload("PURCHASE_HISTORY"),
                openModal(MODAL_NAME.VIEW_ALL_GAMES)
            }}
          >
            View all <IconArrowRight className="ml-[5px] mb-[2px]" />
          </p>
        </div>
        <div className="responsive-grid">
          {" "}
          {Array(6)
            .fill(0)
            .map((e, i) => (
              <div
                className="w-[94px] h-[94px] hover:scale-[1.1] transition-all"
                key={i}
              >
                <Image
                  alt=""
                  src={imgGame}
                  className="w-full h-full rounded-[10px] object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Activities
