/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import React, {
  forwardRef,
  Fragment,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

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

import { MODAL_NAME, SHOP_TAB, STATUS } from "@/utils/constant";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";
import { Tooltip } from "@chakra-ui/react";
import { abbreviateNumber, sleep } from "@/utils/helper";
import Timer from "../other/Timer";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRouter } from "next/router";
import { getItemByCategory } from "@/services/shop.service";
import ButtonLoading from "../loading/ButtonLoading";

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
  const { userInfo, verifyStatus } = useAuthContext();

  const { zera } = userInfo ?? {};

  const content_ref = useRef();

  const handleToggleContent = () => {
    // content_ref.current.classList.toggle("py-3");
    content_ref.current.classList.toggle("h-[242px]");
  };

  return (
    <div className="sticky top-[16px] z-10 min-w-[204px] max-w-[204px] h-fit">
      <div className="bg-blur-500 rounded-2xl px-4 pt-2.5 pb-[14px] h-fit">
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
          className="h-0 text-white pl-6 flex flex-col overflow-y-auto gap-4 transition-all"
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
        <div className="text-white text-base">
          {!userInfo && (
            <Fragment>
              <div className="flex flex-col items-center gap-2 mt-3 mb-4 pt-0.5">
                <Link
                  href={"/login"}
                  className="btn-login text-base text-white font-semibold rounded-[10px] py-[5px] px-[30px] mx-auto"
                >
                  Login
                </Link>
                <Link href={"/register"} className="text-violet-400">
                  Register
                </Link>
                <button
                  className="bg-pink-800 text-[16px] py-[2px] px-5 rounded-[20px] shadow-sm shadow-[#b3597d] w-fit mx-auto block"
                  onClick={() => {
                    openModal(MODAL_NAME.CONFIRM);
                  }}
                >
                  Shop
                </button>
              </div>
            </Fragment>
          )}

          {userInfo && (
            <>
              {verifyStatus === STATUS.SUCCESS ? (
                <UserInfo></UserInfo>
              ) : (
                <div className="h-fit">
                  {/* SIDEBAR LOADING */}
                  <div className="relative">
                    <div className="flex-center flex-col border-t-[2px] border-t-[#C4B5FD] pt-2">
                      <ImageLoading
                        alt=""
                        className="w-[94px] h-[94px] rounded-[20px]"
                      />
                      <span className="my-2 flex-center skeleton-shine h-[10px] w-[94px] rounded-[10px]"></span>
                    </div>
                    <UserMenu />
                    <Timer />
                  </div>
                </div>
              )}
            </>
          )}

          {/* countdown */}
          <Timer />
        </div>
      </div>

      {/* SHOP */}
      {userInfo && (
        <div className="bg-blur-500 rounded-2xl py-2 h-[424px] mt-5 text-white">
          <div className="flex-center border-b-[2px] border-b-[#C4B5FD] mb-2 px-4 w-[70%] mx-auto">
            <span className="font-extrabold text-[12px]">{zera}</span>
            <IconCoin viewBox="-2 -7 55 55" />
          </div>
          <ShopSidebar></ShopSidebar>
          <div className="w-full">
            <Link href={"/shop"}>
              <button className="bg-pink-800 text-[12px] py-[2px] px-5 rounded-[20px] shadow-sm shadow-[#b3597d] w-[40%] mx-auto block">
                Shop
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SideBar);

const UserInfo = () => {
  const { userInfo } = useAuthContext();
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

  return (
    <div className="h-[130px] transition-all duration-500 over" ref={ref}>
      {/* avatar */}
      <div className="group relative" onClick={toggleMenu} id="touch">
        <div className="cursor-pointer">
          <div className="flex-center flex-col border-t-[2px] border-t-[#C4B5FD] pt-2">
            <ImageLoading
              src={
                avatar ||
                "https://img.freepik.com/premium-vector/cute-animal-design_24911-11520.jpg?w=740"
              }
              alt=""
              className="object-cover w-[94px] h-[94px] rounded-[20px]"
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
    </div>
  );
};

const UserMenu = forwardRef((props, ref) => {
  const { logout } = useAuthContext();
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="opacity-0 bg-[#0C0020] px-4 py-3 absolute z-20 left-[-16px] rounded-2xl border border-pink-900 min-w-[204px] top-[120px] invisible
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

const ShopSidebar = () => {
  const { verifyStatus } = useAuthContext();
  const { setPayload, openModal, status, setStatus } = useModalContext();
  const tab = SHOP_TAB.AVATAR;
  const [itemsShop, setItemsShop] = useState([]);

  const getItem = async () => {
    const { data } = await getItemByCategory(1);
    setItemsShop(data?.rows);
    setStatus(STATUS.NOT_START);
  };

  useEffect(() => {
    getItem();
  }, [status === STATUS.SUCCESS]);

  return (
    <div className="grid grid-cols-2 px-2">
      {verifyStatus === STATUS.SUCCESS ? (
        <>
          {itemsShop?.slice(0, 6)?.map((item, i) => (
            <div className="flex-center flex-col" key={i}>
              <div className="group relative">
                <ImageLoading
                  className="w-[80px] h-[80px] object-cover rounded-[10px] group"
                  src={item?.url}
                />
                <div className="hidden group-hover:block bg-[#00000080] absolute-center h-full w-full rounded-[10px]">
                  {item?.user_inventory ? (
                    <div className="text-center absolute-center w-[60px] py-[3px] text-[10px] font-semibold bg-[#350F1E] rounded-[10px] shadow-sm shadow-[#9D174D]">
                      Owned
                    </div>
                  ) : (
                    <button
                      className="absolute-center w-[60px] py-[3px] text-[10px] font-semibold bg-pink-800 rounded-[10px] shadow-sm shadow-[#9D174D]"
                      onClick={() => {
                        setPayload({ item, tab }), openModal(MODAL_NAME.BUY);
                      }}
                    >
                      Buy now
                    </button>
                  )}
                </div>
              </div>
              <p className="flex-center ml-3 text-[10px]">
                {item?.price}
                <IconCoin viewBox="-4 -19 75 75" />
              </p>
            </div>
          ))}{" "}
        </>
      ) : (
        <>
          {Array(6)
            .fill(0)
            .map((e, i) => (
              <div className="flex-center flex-col" key={i}>
                <div className="group relative">
                  <ImageLoading className="w-[80px] h-[80px] rounded-[10px]" />
                </div>
                <p className="flex-center ml-3 text-[10px]">
                  <ButtonLoading isLoading={true} />
                  <IconCoin viewBox="-4 -19 75 75" />
                </p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
