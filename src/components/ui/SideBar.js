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
  IconCategories,
  IconCoin,
  IconCoin22,
  IconConsole,
  IconCup,
  IconLogOut,
  IconMenu,
  IconProfile,
  IconSearchViolet300,
  IconTags,
} from "@/resources/icons";

import logo from "../../../public/images/logo.png";

import { useModalContext } from "@/context/modal-context";
import { useAuthContext } from "@/context/auth-context";

import {
  CLASS_NAME_BY_PATH,
  MODAL_NAME,
  SHOP_TAB,
  STATUS,
} from "@/utils/constant";

import Link from "next/link";

import ImageLoading from "@/components/loading/ImageLoading";
import ButtonLoading from "@/components/loading/ButtonLoading";
import Timer from "@/components/other/Timer";

import { Tooltip, useToast } from "@chakra-ui/react";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { useRouter } from "next/router";

import { getItemByCategory } from "@/services/shop.service";

import {
  abbreviateNumber,
  categoryUrl,
  notifyErrorMessage,
} from "@/utils/helper";
import { getAllCategories } from "@/services/game.service";
import { useDispatch } from "react-redux";
import { dynamicPaths, staticPaths } from "@/utils/$path";

const ALL_MENU_NODE = [
  {
    icon: <IconCategories className="w-8 h-8 mx-auto" />,
    title: "Game Category",
    href: dynamicPaths.all_categories_by_superslug("game"),
  },
  {
    icon: <IconCategories className="w-8 h-8 mx-auto" />,
    title: "Article Category",
    href: staticPaths.all_article_category,
  },
  {
    icon: <IconTags className="w-8 h-8 mx-auto" />,
    title: "Game Tags",
    href: dynamicPaths.all_game_tags_by_superslug("game"),
  },
  {
    icon: <IconTags className="w-8 h-8 mx-auto" />,
    title: "Article Tags",
    href: staticPaths.all_article_tags,
  },
];

const SideBar = () => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const { openModal } = useModalContext();
  const { userInfo, verifyStatus } = useAuthContext();
  const router = useRouter();
  const { pathname } = router ?? {};

  const { zera } = userInfo ?? {};

  const content_ref = useRef();

  const handleToggleContent = () => {
    // content_ref.current.classList.toggle("py-3");
    content_ref.current.classList.toggle("h-[242px]");
  };

  const getAllCategoriesGame = async () => {
    try {
      const { data } = await getAllCategories(dispatch);
      setCategories(data);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    getAllCategoriesGame();
  }, []);

  return (
    <div
      className={`sticky top-[16px] z-10 min-w-[204px] max-w-[204px] h-fit tbl-hidden mb-hidden`}
    >
      <div className="bg-blur-500 rounded-2xl px-4 pt-2.5 pb-[14px] h-fit">
        {/* head */}
        <div className="px-3 pb-[2px]">
          <Link href={staticPaths.home}>
            <Image
              src={logo}
              alt=""
              width={134}
              height={72}
              className="mx-auto"
            />
          </Link>

          <div className="flex gap-2.5 justify-between items-center cursor-pointer px-5">
            <div onClick={handleToggleContent}>
              <IconMenu className="w-[42px] text-violet-300"></IconMenu>
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

        {/* menu items */}
        <div
          ref={content_ref}
          className="h-0 text-violet-300 text-sm px-2 flex flex-col overflow-y-auto gap-5 transition-all w-auto modal-scroll"
          id="menu_item"
        >
          {categories?.map((e, i) => (
            <Link href={categoryUrl(e?.superslug?.value, e?.slug)} key={i}>
              <div className="flex gap-x-2 items-center font-bold cursor-pointer">
                <div className="w-12">
                  {e?.icon ? (
                    <ImageLoading
                      src={e?.icon}
                      alt=""
                      className="w-8 h-8 object-cover mx-auto"
                    />
                  ) : (
                    <IconConsole className="w-8 h-8 mx-auto" />
                  )}
                </div>
                <span className="text-ellipsis overflow-hidden whitespace-nowrap w-[80%]">
                  {e?.label}
                </span>
              </div>
            </Link>
          ))}

          <p className="w-[90%] mx-auto bg-[#ffcde980] pt-[1px]"></p>

          {/* menu items all */}
          {ALL_MENU_NODE.map(({ icon, title, href }, i) => (
            <Link href={href} key={i}>
              <div className="flex gap-x-2 items-center font-bold cursor-pointer">
                <div className="w-12">{icon}</div>
                <span className="text-ellipsis overflow-hidden whitespace-nowrap w-[80%]">
                  {title}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* user info */}
        <div className="text-white text-base mt-2">
          {!userInfo && (
            <Fragment>
              <div className="flex flex-col items-center gap-2 mt-3 mb-4 pt-0.5">
                <Link
                  href={staticPaths.login}
                  className="btn-login text-base text-white font-semibold rounded-[10px] py-[5px] px-[30px] mx-auto"
                >
                  Login
                </Link>
                <Link href={staticPaths.register} className="text-violet-400">
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
        <div className="bg-blur-500 rounded-2xl py-2 h-fit mt-4 text-white pr-1">
          <div className="flex-center border-b-[2px] border-b-[#C4B5FD] mb-2 px-4 py-1 w-[70%] mx-auto gap-2">
            <span className="font-extrabold text-[16px]">
              {abbreviateNumber(zera)}
            </span>
            <IconCoin className="w-5" />
          </div>
          <ShopSidebar></ShopSidebar>
          <div className="w-full">
            <Link href={"/shop"}>
              <button className="bg-pink-800 text-[10px] py-[2px] px-5 rounded-[20px] shadow-sm shadow-[#b3597d] w-[40%] mx-auto block mt-2">
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
    <div className="h-[130px] transition-all duration-500" ref={ref}>
      {/* avatar */}
      <div className="group relative" onClick={toggleMenu} id="touch">
        <div className="cursor-pointer">
          <div className="flex-center flex-col border-t-[2px] border-t-[#C4B5FD] pt-2">
            <ImageLoading
              src={
                avatar ||
                "/avatar-1.svg"
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
    <div className="grid grid-cols-2 px-2 overflow-auto h-[200px]">
      {verifyStatus === STATUS.SUCCESS ? (
        <>
          {itemsShop?.map((item, i) => (
            <div className="flex items-center flex-col mb-3" key={i}>
              <div className="group relative">
                <ImageLoading
                  className="w-[80px] h-[80px] object-cover rounded-[10px] group"
                  src={item?.url}
                />
                <div className="hidden group-hover:block bg-[#00000080] absolute-center h-full w-full rounded-[10px]">
                  {!item?.user_inventory && (
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
              {item?.user_inventory ? (
                <div className="mx-auto mt-2 mb-[5px] text-center w-[60px] py-[3px] text-[11px] font-semibold bg-[#350F1E] rounded-[10px] shadow-sm shadow-[#9D174D]">
                  Owned
                </div>
              ) : (
                <>
                  <p className="flex-center ml-3 text-[11px]">
                    {item?.price}
                    <IconCoin22 viewBox="-4 -5 35 35" />
                  </p>
                </>
              )}
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
                <div className="flex-center ml-3 text-[10px]">
                  <ButtonLoading isLoading={true} />
                  <IconCoin viewBox="-4 -19 75 75" />
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
