import React, { useEffect, useRef, useState } from "react"

import { useModalContext } from "@/context/modal-context"
import { EDIT_PROFILE_TAB, MODAL_NAME } from "@/utils/constant"
import { sleep } from "@/utils/helper"
import BoxModal from "./BoxModal"

import { IconClose } from "@/resources/icons"
import Image from "next/image"
import avaImg from "../../../public/images/ava-user.png"
import lineImg from "../../../public/images/Line.png"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

const ModalEditProfile = () => {
  const { openModal, payload } = useModalContext()
  const modal_ref = useRef(null)
  const DURATION = 0
  const [tab, setTab] = useState(payload)

  const handleCloseModal = () => {
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE))
  }

  useOnClickOutside(modal_ref, handleCloseModal)

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal")
    })
  }, [])

  const tabs = [
    {
      title: "Avatar",
      tabName: EDIT_PROFILE_TAB.AVATAR,
    },
    {
      title: "Cover page",
      tabName: EDIT_PROFILE_TAB.COVER_PAGE,
    },
  ]

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 h-fit w-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-gradient-to-t from-[#740B99] to-[#2F0652] px-[30px] pb-[20px]"
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="bg-pink-800 rounded-[20px] mx-auto py-[5px] text-[32px] text-center font-bold w-[250px] shadow-md shadow-[#F761D6]">
            Edit Profile
          </div>
          <button onClick={handleCloseModal}>
            <IconClose />
          </button>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col justify-between items-center w-[204px]">
            <Image alt="avatar" src={avaImg} />
            <input
              placeholder="User name"
              className="w-full my-[10px] rounded-[20px] p-2 px-3 box-border text-black edit-input bg-[95%_50%] focus-visible:outline-0"
            />
            <textarea
              className="w-full h-[193px] rounded-[20px] p-2 px-3 box-border text-black edit-input bg-[95%_95%] focus-visible:outline-0"
              placeholder="User’s quote"
            />
            <button className="mt-[10px] w-[74px] h-[36px] btn-save-gradient">
              Save
            </button>
          </div>

          <Image alt="line" className="mx-[30px]" src={lineImg} />

          <div className="flex flex-col justify-between h-full w-fit min-w-fit">
            <div className="flex">
              {tabs?.map(({ title, tabName }, i) => (
                <div
                  key={i}
                  onClick={() => setTab(tabName)}
                  className={`${
                    tabName === tab
                      ? "border-b-2 border-b-[#fff]"
                      : "opacity-[0.7]"
                  } text-center text-[28px] font-bold rounded-t-[20px] w-fit border-b-0 px-[5px] py-[2px] cursor-pointer mx-3`}
                >
                  {title}
                </div>
              ))}
            </div>
            <div className="overflow-auto h-fit">
              {tab == EDIT_PROFILE_TAB.AVATAR ? (
                <div
                  className="mt-[30px] grid grid-cols-1 justify-center min-[752px]:grid-cols-2
                  min-[990px]:grid-cols-3 min-[1248px]:grid-cols-4 gap-4 overflow-auto max-h-[500px] pr-[20px]"
                >
                  {Array(8)
                    .fill(0)
                    .map((e, i) => (
                      <div className="relative group cursor-pointer">
                        <img
                          key={i}
                          alt=""
                          src={
                            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/321478115380977.604d71f1a8580.png"
                          }
                          className="rounded-2xl w-[204px] h-[204px] object-cover max-[752px]:block max-[752px]:mx-auto"
                        ></img>
                        <div className="hidden group-hover:block rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                      </div>
                    ))}
                </div>
              ) : (
                <div
                  className="mt-[30px] grid grid-cols-1 justify-center
                  min-[752px]:grid-cols-2 gap-4 overflow-auto max-h-[500px] pr-[20px]"
                >
                  {Array(4)
                    .fill(0)
                    .map((e, i) => (
                      <div className="relative group cursor-pointer">
                        <img
                          key={i}
                          alt=""
                          src={
                            "https://images.unsplash.com/photo-1676030788561-deddbc7f5329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                          }
                          className="rounded-2xl w-[424px] h-[204px] object-cover max-[752px]:block max-[752px]:mx-auto"
                        ></img>
                        <div className="hidden group-hover:block rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BoxModal>
  )
}

export default ModalEditProfile
