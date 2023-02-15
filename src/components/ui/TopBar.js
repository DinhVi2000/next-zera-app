import React, { memo, useRef } from "react";

import Image from "next/image";

import {
  IconAction,
  IconBasketball,
  IconCasual,
  IconCoin,
  IconConsole,
  IconDressUp,
  IconEscape,
  IconFbs,
  IconHorror,
  IconIo,
  IconMenu,
  IconRider,
  IconSearchViolet300,
} from "@/resources/icons";

import logo from "../../../public/images/logo.png";
import avatar from "../../../public/images/avatar.jpg";
import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";

const topBarItems = [
  {
    icon: <IconRider />,
    text: "Rider",
  },
  {
    icon: <IconAction />,
    text: "Action",
  },
  {
    icon: <IconCasual />,
    text: "Casual",
  },
  {
    icon: <IconBasketball />,
    text: "Basketball",
  },
  {
    icon: <IconDressUp />,
    text: "Dress up",
  },
  {
    icon: <IconEscape />,
    text: "Escape",
  },
  {
    icon: <IconFbs />,
    text: "FBS",
  },
  {
    icon: <IconHorror />,
    text: "Horror",
  },
  {
    icon: <IconIo />,
    text: ".io",
  },
  {
    icon: <IconConsole />,
    text: "Console",
  },
  {
    icon: <IconCasual />,
    text: "Casual",
  },
  {
    icon: <IconHorror />,
    text: "Horror",
  },
];

const TopBar = () => {
  const { openModal } = useModalContext();

  const content_ref = useRef();

  const handleToggleContent = () => {
    // content_ref.current.classList.toggle("py-3");
    content_ref.current.classList.toggle("h-0-important");
  };

  return (
    <div className="px-4 pt-2.5 pb-[13px] bg-blur-500 w-fit rounded-2xl h-fit fixed z-10">
      {/* head */}
      <div className="px-5 pb-3 border-violet-300 border-b-[1px]">
        <Image src={logo} alt="" width={134} height={72} className="mb-1" />

        <div className="flex gap-2.5 justify-center">
          <IconMenu onClick={handleToggleContent}></IconMenu>
          <div
            onClick={() => {
              openModal(MODAL_NAME.MENUBAR);
            }}
          >
            <IconSearchViolet300></IconSearchViolet300>
          </div>
        </div>
      </div>

      {/* content */}
      <div
        ref={content_ref}
        className="h-[705px] text-white  pl-6 flex flex-col overflow-hidden gap-4 border-violet-300 border-b-[1px] transition-all "
      >
        {topBarItems?.map((e, i) => (
          <div
            key={i}
            className="flex gap-2.5 items-center text-base font-bold cursor-pointer"
            id="menu_item"
          >
            {e?.icon} <span>{e?.text}</span>
          </div>
        ))}
      </div>

      {/* user info */}
      <div className="text-white text-base pt-4">
        {/* avatar */}
        <div className="flex items-center gap-2.5 pl-5 mb-4">
          <Image
            src={avatar}
            alt=""
            className="object-cover w-[50px] h-[50px] rounded-full"
          ></Image>
          <span>avatar 2</span>
        </div>

        {/* coin */}
        <div className="flex items-center justify-between gap-2.5 text-base font-black px-2.5 mb-4">
          <button className="bg-pink-800 py-[5px] px-5 rounded-[20px] border-[1px] border-[#F9A8D4] shadow-pink-500">
            Shop
          </button>
          <div className="flex items-center gap-2">
            <span>70</span>
            <IconCoin />
          </div>
        </div>

        {/* countdown */}
        <div className="bg-violet-700 px-8 py-1.5 rounded-[10px] text-center count-down text-base">
          00:00:00
        </div>
      </div>
    </div>
  );
};

export default memo(TopBar);
