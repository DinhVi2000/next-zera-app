/* eslint-disable @next/next/no-img-element */
import { useAuthContext } from "@/context/auth-context";
import {
  IconCoin,
  IconEarn,
  IconGamePad,
  IconLeftWing,
  IconRightWing,
} from "@/resources/icons";
import { useRouter } from "next/router";
import React, { Fragment, memo } from "react";
import { useSelector } from "react-redux";
import ImageLoading from "../loading/ImageLoading";
import SidebarMB from "../responsive/SidebarMB";

const HallOfFame = () => {
  const { hallOfFame } = useSelector(({ user }) => user) ?? {};

  const { pathname } = useRouter();

  const { info, played_game } = hallOfFame ?? {};

  const { username, avatar, quote, zera, highest_playstreak, playstreak } =
    info ?? {};
  const { count, rows } = played_game ?? {};

  const items = [
    {
      id: 1,
      icon: <IconEarn className="max-h-[128px] mb-2.5 mx-auto" />,
      value: zera || 0,
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
          <span className="text-gradient-hof text-[90px] font-bold absolute left-[50%] translate-x-[-50%]">
            {highest_playstreak || 0}
          </span>
          <IconRightWing />
        </div>
      ),
      value: null,
      title: "Highest Playstreak",
      desc: `Playstreak: ${playstreak || 0} days`,
    },
  ];

  return (
    <div>
      <SidebarMB
        className={"tbl-flex mb-4"}
        childClassName={"static-important"}
      />
      <div
        className="text-white bg-blur-800 border-[5px] border-violet-400 pt-2.5 rounded-[20px]
                     p-[62px] max-[550px]:p-[30px]"
      >
        {/* title */}
        <div className="bg-pink-800 rounded-[20px] mx-auto py-2.5 text-[40px] text-center font-bold w-[280px] mb-[58px]">
          Hall Of Fame
        </div>

        {/* content */}
        <div
          className="border-[5px] border-pink-500 bg-[#5b21b666] rounded-[30px]
                      p-16 max-[450px]:p-5"
        >
          <div className="flex items-center max-[991px]:flex-col gap-20">
            {/* avatar */}
            {pathname !== "/hall-of-fame" && (
              <div className="max-w-[204px] max-[991px]:mx-auto">
                <ImageLoading
                  src={avatar}
                  alt="avatar"
                  className="w-[204px] h-[204px] object-cover rounded-[20px]"
                />
                <h2 className="text-center font-bold text-base">{username}</h2>
                <p className="text-[12px]">{quote}</p>
              </div>
            )}

            {/* item */}
            <div className="grid grid-cols-1 min-[1250px]:grid-cols-2 min-[1492px]:grid-cols-3 gap-[25px]">
              {items?.map(({ icon, value, desc, title }, i) => (
                <div
                  key={i}
                  className="hall-of-fame__item min-w-[204px] min-h-[312px] border border-[#F9A8D4] rounded-[30px] pt-8 pb-2 px-2.5 text-center
                               flex flex-col items-center justify-between"
                >
                  <div className="w-full mb-[61px]">
                    {icon}
                    <h2 className="text-gradient-hof text-[28px] font-semibold">
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

          <div className="flex justify-end">
            {/* top played */}
            <div className="max-w-[845px] w-full text-center">
              <h1 className="text-[28px] font-semibold py-4">
                Top game played
              </h1>
              <div className="w-full grid grid-cols-1 min-[1492px]:grid-cols-2 gap-x-5 gap-y-[15px]">
                {rows?.map(({ game_detail, zera_earned }, i) => (
                  <div
                    key={i}
                    className="bg-gradient-tgp w-full rounded-[20px] p-[10px] text-base font-bold
                      flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <ImageLoading
                        src={game_detail?.thumbnail}
                        alt=""
                        className="w-[94px] h-[94px] object-cover rounded-2xl"
                      />
                      <p>{game_detail?.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>{zera_earned}</span>
                      <IconCoin />
                    </div>
                  </div>
                ))}

                <LoadingWrapper data={rows} />
              </div>
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
