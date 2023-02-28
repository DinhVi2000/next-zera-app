/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import React, { forwardRef, Fragment, memo, useEffect, useRef } from "react";

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
  IconLogOut,
  IconMenu,
  IconProfile,
  IconRider,
  IconSearchViolet300,
} from "@/resources/icons";

import logo from "../../../public/images/logo.png";

import { useModalContext } from "@/context/modal-context";

import { MODAL_NAME, STATUS } from "@/utils/constant";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";
import { Tooltip } from "@chakra-ui/react";
import { sleep } from "@/utils/helper";
import Timer from "../other/Timer";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRouter } from "next/router";

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
  const { userInfo, logout, verifyStatus, setVerifyStatus } = useAuthContext();

  const { username, avatar, zera } = userInfo ?? {};

  const content_ref = useRef();

  const handleToggleContent = () => {
    // content_ref.current.classList.toggle("py-3");
    content_ref.current.classList.toggle("h-0-important");
  };

  return (
    <div className="px-4 pt-2.5 pb-[14px] bg-blur-500 rounded-2xl h-fit sticky top-[16px] z-10  min-w-[204px] max-w-[204px]">
      {/* head */}
      <div className="px-3 pb-3">
        <Link href={"/"}>
          <Image
            src={logo}
            alt=""
            width={134}
            height={72}
            className="mx-auto"
          />
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
        {userInfo && <UserInfo></UserInfo>}
        {!userInfo && (
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
  const menu_ref = useRef();

  useOnClickOutside(menu_ref, (e) => {
    const touch = document.getElementById("touch");
    if (touch?.contains(e.target)) return;

    menu_ref.current.classList.remove("opacity-100");
    menu_ref.current.classList.add("invisible");
  });

  const toggleMenu = () => {
    menu_ref.current.classList.toggle("opacity-100");
    menu_ref.current.classList.toggle("invisible");
  };

  useEffect(() => {
    sleep(10).then(() => {
      ref.current.classList.add("h-[120px]");
    });
  }, []);

  return (
    <div className=" h-0 transition-all duration-500" ref={ref}>
      {/* avatar */}
      <div className="group relative" onClick={toggleMenu} id="touch">
        <div className="cursor-pointer">
          <div className="flex items-center gap-2.5 pl-5 mb-4">
            <ImageLoading
              src={avatar}
              alt=""
              className="object-cover w-[50px] h-[50px] rounded-full"
            />
            <Tooltip label={username} aria-label="A tooltip">
              <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                {username}
              </span>
            </Tooltip>
          </div>
        </div>

        {/* user menu */}
        <UserMenu ref={menu_ref} />
      </div>

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
    </div>
  );
};

const UserMenu = forwardRef((props, ref) => {
  const { logout } = useAuthContext();
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="opacity-0 bg-[#0C0020] px-4 py-3 absolute left-[-16px] rounded-2xl border border-pink-900 min-w-[204px] top-[calc(100% + 16px)] invisible
               transition-all"
    >
      <div>
        <div
          className="flex gap-2.5 items-center pb-3 px-3 cursor-pointer
        text-violet-300 hover:text-violet-700 transition-all"
          onClick={() => router.push("/profile")}
        >
          <IconProfile className="w-[20px] h-[20px]" /> <span>Profile</span>
        </div>
        <div
          className="flex gap-2.5 items-center cursor-pointer border-[1px] border-b-violet-800 border-transparent pb-3 px-3
        text-violet-300 hover:text-violet-700 transition-all"
          onClick={() => router.push("/hall-of-fame")}
        >
          <IconCup className="w-[18px] h-[18px]" /> <span>Hall of Fame</span>
        </div>
        <div
          className="flex gap-2.5 items-center pt-3 px-3 cursor-pointer
        hover:text-violet-700 transition-all"
          onClick={logout}
        >
          <IconLogOut className="w-[18px] h-[18px] ml-[2px]" />{" "}
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
});
