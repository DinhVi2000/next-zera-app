/* eslint-disable @next/next/no-img-element */
import { useAuthContext } from "@/context/auth-context";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePagination } from "@/hooks/usePagination";
import {
  IconCoin,
  IconEarn,
  IconGamePad,
  IconLeftWing,
  IconRightWing,
} from "@/resources/icons";
import { dynamicPaths } from "@/utils/$path";
import { DEFAULT_AVATAR_SRC } from "@/utils/constant";
import { animateValue } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import ImageLoading from "../loading/ImageLoading";
import Pagination from "../pagination/Pagination";
import SidebarMB from "../responsive/SidebarMB";

const ITEM_PER_PAGE = 4;

const HallOfFame = () => {
  const { hallOfFame } = useSelector(({ user }) => user) ?? {};
  const { pathname } = useRouter();

  const matches = useMediaQuery("(max-width: 550px)");

  const { user_info, played_game, total_earned_zera, play_streak } =
    hallOfFame ?? {};

  const { username, avatar, quote, zera, highest_playstreak } = user_info ?? {};
  const { count, rows } = played_game ?? {};

  const { currentItems, handlePageClick } = usePagination(ITEM_PER_PAGE, rows);

  const items = [
    {
      id: 1,
      icon: <IconEarn className="max-h-[128px] mb-2.5 mx-auto" />,
      value: parseInt(total_earned_zera) || 0,
      title: "Earned Zera",
      desc: "",
    },
    {
      id: 2,
      icon: <IconGamePad className="max-h-[128px] mx-auto" />,
      value: count || 0,
      title: "Total games played",
      desc: "",
    },
    {
      id: 1,
      icon: (
        <div className="flex justify-between w-full pt-4 relative">
          <IconLeftWing />
          <span className="count-number text-gradient-hof text-[90px] font-bold absolute left-[50%] translate-x-[-50%]">
            {highest_playstreak || 0}
          </span>
          <IconRightWing />
        </div>
      ),
      value: null,
      title: "Highest Playstreak",
      desc: (
        <span>
          Playstreak: <span className="count-number">{play_streak || 0}</span>{" "}
          days
        </span>
      ),
    },
  ];

  const objs = document.getElementsByClassName("count-number");

  useEffect(() => {
    if (!items || !objs) return;

    for (let i = 0; i < objs.length; i++) {
      animateValue(objs[i], 0, objs[i].innerText, 2000);
    }
  }, [user_info, objs]);

  return (
    <div>
      <SidebarMB
        className={"tbl-flex mb-4"}
        childClassName={"static-important"}
      />
      <div
        className="text-white w-responsive bg-blur-800 border-[5px] border-violet-400 pt-2.5 rounded-[20px]
                     p-[62px] max-[550px]:p-[30px]"
      >
        {/* title */}
        <div className="bg-pink-800 rounded-[20px] mx-auto py-2.5 text-[40px] max-[990px]:text-[30px] text-center font-bold w-full max-w-[280px] mb-[58px]">
          Hall Of Fame
        </div>

        {/* content */}
        <div className="border-[5px] border-pink-500 bg-gradient-hof rounded-[30px] p-16 max-[550px]:p-5">
          <div className="flex items-center max-[1541px]:flex-col gap-20">
            {/* avatar */}
            {pathname !== "/hall-of-fame" && (
              <div className="w-full max-w-[204px] h-full  max-[991px]:mx-auto">
                <ImageLoading
                  src={avatar || DEFAULT_AVATAR_SRC}
                  alt="avatar"
                  className="w-[204px] h-[204px] object-cover rounded-[20px]"
                />
                <h2 className="text-center font-bold text-base mt-2">
                  {username}
                </h2>
                <p className="text-[12px]">{quote}</p>
              </div>
            )}

            {/* item */}
            {/* <div className="grid grid-cols-1 min-[1250px]:grid-cols-2 min-[1492px]:grid-cols-3 gap-[25px]"> */}
            <div className="flex flex-wrap w-full justify-center gap-[25px]">
              {items?.map(({ icon, value, desc, title }, i) => (
                <div
                  key={i}
                  className="hall-of-fame__item min-w-[204px] min-h-[312px] border border-[#F9A8D4] rounded-[30px] pt-8 pb-2 px-2.5 text-center
                               flex flex-col items-center justify-between"
                >
                  <div className="w-full mb-[61px]">
                    {icon}
                    <h2 className="count-number text-gradient-hof text-[28px] font-semibold">
                      {value}
                    </h2>
                  </div>
                  <div>
                    <h3 className="text-base font-bold">{title}</h3>
                    <p className="text-[10px] min-h-[15px]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            {/* top played */}
            <div className="max-w-[845px] w-full text-center">
              <h1 className="text-[28px] font-semibold py-6">
                Top game played
              </h1>

              {/* list */}
              <div className="w-full h-[501px] min-[1492px]:h-[243px] grid grid-cols-1 min-[1492px]:grid-cols-2 gap-x-5 gap-y-[15px]">
                {currentItems?.map(({ game_detail, zera_earned }, i) => (
                  <Link
                    href={dynamicPaths.game_by_slug(
                      game_detail?.superslug?.value,
                      game_detail?.slug
                    )}
                    key={i}
                  >
                    <div
                      className="bg-gradient-tgp max-h-[114px] overflow-hidden w-full rounded-[20px] p-[10px] text-base font-bold
                      flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <ImageLoading
                          src={game_detail?.thumbnail}
                          alt=""
                          className="w-[94px] h-[94px] min-w-[94px] object-cover rounded-2xl"
                        />
                        <p className=" max-[550px]:hidden">
                          {game_detail?.title}
                        </p>
                      </div>
                      <div className="flex max-[550px]:hidden items-center gap-4">
                        <span className="count-number">{zera_earned}</span>
                        <IconCoin className="w-[30px] h-[30px]" />
                      </div>

                      {/* mb */}
                      <div className="hidden max-[550px]:block">
                        <p className="text-left">{game_detail?.title}</p>
                        <div className="flex-center gap-2">
                          <span className="count-number">{zera_earned}</span>
                          <IconCoin className="w-[30px] h-[30px]" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                <LoadingWrapper data={rows} />
              </div>

              {/* pagination */}
              <Pagination
                items={rows}
                itemsPerPage={ITEM_PER_PAGE}
                onPageChange={handlePageClick}
                marginPagesDisplayed={matches ? 1 : 3}
                pageRangeDisplayed={matches ? 2 : 3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;

const LoadingWrapper = memo(function LoadingItemComponent({ data }) {
  return (
    <Fragment>
      {!data &&
        Array(4)
          .fill(0)
          .map((e, i) => (
            <div
              key={i}
              className="bg-gradient-tgp w-full rounded-[20px] p-[10px] text-base font-bold
        flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <ImageLoading
                  src=""
                  alt=""
                  className="w-[94px] h-[94px] object-cover rounded-2xl"
                />
                <p className="skeleton-shine w-[150px] h-4 rounded-xl"></p>
              </div>
            </div>
          ))}
    </Fragment>
  );
});
