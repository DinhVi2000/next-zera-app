/* eslint-disable @next/next/no-img-element */
import React, { Fragment, memo, useEffect, useRef } from "react";

import Image from "next/image";

import {
  IconAction,
  IconBasketball,
  IconCasual,
  IconCoin,
  IconConsole,
  IconCup,
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

import { useModalContext } from "@/context/modal-context";

import { MODAL_NAME } from "@/utils/constant";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";
import { Tooltip } from "@chakra-ui/react";
import { sleep } from "@/utils/helper";
import Timer from "../other/Timer";

const sideBarItems = [
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

const SideBar = () => {
  const { openModal } = useModalContext();
  const { userInfo, logout } = useAuthContext();

  const { username, avatar, zera } = userInfo ?? {};

  const content_ref = useRef();

  const handleToggleContent = () => {
    // content_ref.current.classList.toggle("py-3");
    content_ref.current.classList.toggle("h-0-important");
  };

  return (
    <div className="px-4 pt-2.5 pb-[13px] bg-blur-500 w-fit rounded-2xl h-fit sticky top-[16px] z-10 max-w-[204px]">
      {/* head */}
      <div className="px-3 pb-3">
        <Link href={"/"}>
          <Image src={logo} alt="" width={134} height={72} className="mb-1" />
        </Link>

        <div className="flex gap-2.5 justify-between items-center cursor-pointer px-4">
          <div onClick={handleToggleContent}>
            <IconMenu></IconMenu>
          </div>
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
        className="h-[242px] text-white pl-6 flex flex-col overflow-y-auto gap-4 transition-all"
      >
        {sideBarItems?.map((e, i) => (
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
        {userInfo ? (
          <UserInfo></UserInfo>
        ) : (
          <Fragment>
            <div className="flex flex-col items-center gap-2 mb-8 pt-0.5">
              <Link
                href={"/login"}
                className="btn-login text-base text-white font-semibold rounded-[10px] py-[5px] px-[30px] mx-auto"
              >
                Login
              </Link>
              <Link href={"/register"} className="text-violet-400">
                Register
              </Link>
            </div>
          </Fragment>
        )}

        {/* countdown */}
        <Timer />
      </div>
    </div>
  );
};

export default memo(SideBar);

const UserInfo = () => {
  const { userInfo, logout } = useAuthContext();
  const { username, avatar, zera } = userInfo ?? {};

  const ref = useRef();

  useEffect(() => {
    sleep(10).then(() => {
      ref.current.classList.add("h-[168px]");
    });
  }, []);

  return (
    <div className="overflow-hidden h-0 transition-all duration-500" ref={ref}>
      {/* avatar */}
      <Link href={"/profile"}>
        <div className="flex items-center gap-2.5 pl-5 mb-4">
          <ImageLoading
            src={
              avatar ||
              "https://img.freepik.com/premium-vector/cute-animal-design_24911-11520.jpg?w=740"
            }
            alt=""
            className="object-cover w-[50px] h-[50px] rounded-full"
          />
          <Tooltip label={username} aria-label="A tooltip">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">
              {username}
            </span>
          </Tooltip>
        </div>
      </Link>

      {/* coin */}
      <div className="flex items-center justify-between gap-2.5 text-base font-black px-2.5 mb-4">
        <Link href={"/shop"}>
          <button className="bg-pink-800 py-[5px] px-5 rounded-[20px] border-[1px] border-[#F9A8D4] shadow-pink-500">
            Shop
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <span>{zera}</span>
          <IconCoin />
        </div>
      </div>
      <div className="w-full text-center mb-4">
        <button
          className="bg-pink-800 mx-auto py-[5px] px-5 rounded-[20px] border-[1px] border-[#F9A8D4] shadow-pink-500"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
