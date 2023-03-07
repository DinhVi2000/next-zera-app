import React, { memo, useRef } from "react";

import Link from "next/link";

import { useAuthContext } from "@/context/auth-context";
import { useModalContext } from "@/context/modal-context";

import { IconCoin, IconLogo, IconMenu, IconSearch } from "@/resources/icons";

import { MODAL_NAME } from "@/utils/constant";

import ImageLoading from "@/components/loading/ImageLoading";
import Timer from "@/components/other/Timer";

const Menu = ({ className, ...props }) => {
  const menu_ref = useRef();

  const { userInfo } = useAuthContext();
  const { openModal } = useModalContext();

  const { avatar, username, zera } = userInfo ?? {};

  const handleToggleMenu = () => {
    menu_ref.current.classList.toggle("h-204-imp");
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="fixed w-[94px] z-30 rounded-2xl bg-blur-500 shadow-[2px_2px_4px_#522658] backdrop-blur-[10px] overflow-hidden
                     transition-all h-[94px]"
        ref={menu_ref}
      >
        <div className="p-3">
          {/* logo  */}
          <Link href={"/"}>
            <IconLogo className="mx-auto mb-1 w-10 h-10"></IconLogo>
          </Link>

          {/* button */}
          <div className="text-violet-300 flex items-center justify-between">
            <IconMenu className="w-8 h-8" onClick={handleToggleMenu} />
            <IconSearch
              className="w-[25px] h-[25px] p-0.5"
              onClick={() => openModal(MODAL_NAME.MENUBAR)}
            />
          </div>
        </div>

        <div className="border-violet-300 border-t-[1px] w-[70px] mx-auto"></div>

        {/* content */}
        <div className="pt-4 px-2.5">
          <div className="text-white text-base">
            {!userInfo && (
              <div className="flex flex-col items-center mt-3 pt-0.5 overflow-hidden">
                <Link
                  href={"/login"}
                  className="btn-login text-[8px] text-white text-center flex items-center justify-center font-semibold rounded-[5px] mx-auto w-[50px] h-[18px]"
                >
                  Login
                </Link>
                <Link href={"/register"} className="text-violet-400 text-[8px]">
                  Register
                </Link>
              </div>
            )}

            {userInfo && (
              <div className="">
                <div className="flex gap-[5px] px-1 mb-1">
                  <ImageLoading src={avatar} className="w-6 h-6 rounded-full" />
                  <span className="text-[8px] font-medium">{username}</span>
                </div>

                <div className="text-[8px] font-black flex items-center gap-[5px] mb-1">
                  <Link
                    href={"/shop"}
                    className=" bg-pink-900 border border-pink-300 px-2.5 rounded-[10px] leading-4 h-4 flex-center"
                  >
                    Shop
                  </Link>
                  <div className="flex gap-[5px]">
                    <span>{zera}</span>
                    <IconCoin className="w-4" />
                  </div>
                </div>
              </div>
            )}

            {/* countdown */}
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Menu);
