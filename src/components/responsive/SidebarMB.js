import React, { forwardRef, memo, useRef } from "react";

import Link from "next/link";

import { useAuthContext } from "@/context/auth-context";
import { useModalContext } from "@/context/modal-context";

import {
  IconCoin,
  IconCup,
  IconLogo,
  IconLogOut,
  IconMenu,
  IconProfile,
  IconSearch,
} from "@/resources/icons";

import { MODAL_NAME } from "@/utils/constant";

import ImageLoading from "@/components/loading/ImageLoading";
import Timer from "@/components/other/Timer";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { useRouter } from "next/router";
import { abbreviateNumber } from "@/utils/helper";
import { staticPaths } from "@/utils/$path";

const SidebarMB = ({ className, childClassName, ...props }) => {
  const ref = useRef();
  const menu_ref = useRef();

  const { userInfo } = useAuthContext();
  const { openModal } = useModalContext();

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

  const { avatar, username, zera } = userInfo ?? {};

  const handleToggleMenu = () => {
    ref.current.classList.toggle("h-104-imp");
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`fixed w-[94px] z-30 rounded-2xl bg-blur-500 shadow-[2px_2px_4px_#522658] backdrop-blur-[10px] 
                    transition-all min-h-[94px] ${childClassName} `}
      >
        <div className="p-3 pb-[6px]">
          {/* logo  */}
          <Link href={staticPaths.home}>
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

        <div ref={ref} className="h-0 overflow-hidden transition-all">
          {/* border  */}
          <div className="border-violet-300 border-t-[1px] w-[70px] mx-auto"></div>

          {/* content */}
          <div className="pt-4 px-2.5">
            <div className="text-white text-base">
              {!userInfo && (
                <div className="flex flex-col items-center mt-3 pt-0.5 overflow-hidden">
                  <Link
                    href={staticPaths.login}
                    className="btn-login text-[8px] text-white text-center flex items-center justify-center font-semibold rounded-[5px] mx-auto w-[50px] h-[18px]"
                  >
                    Login
                  </Link>
                  <Link
                    href={staticPaths.register}
                    className="text-violet-400 text-[8px]"
                  >
                    Register
                  </Link>
                </div>
              )}

              {userInfo && (
                <div className="">
                  <div
                    className="flex gap-[5px] px-1 mb-1"
                    onClick={toggleMenu}
                    id="touch"
                  >
                    <ImageLoading
                      src={avatar}
                      className="w-6 h-6 rounded-full"
                    />
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
                      <span>{abbreviateNumber(zera)}</span>
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

        {/* user menu */}
        <UserMenu ref={menu_ref} />
      </div>
    </div>
  );
};
export default memo(SidebarMB);

const UserMenu = forwardRef(function UserMenuComponent(props, ref) {
  const { logout } = useAuthContext();
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="opacity-0 bg-[#0C0020] px-4 py-3 absolute z-20 scale-90 left-[calc(100%+5px)] rounded-2xl border border-pink-900 min-w-[204px] top-[120px] invisible
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
          className="flex gap-2.5 items-center pt-3 px-3 cursor-pointer text-white
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
