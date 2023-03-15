/* eslint-disable @next/next/no-img-element */
import { IconCoin } from "@/resources/icons";
import { getArea } from "@/utils/helper";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import ImageLoading from "../loading/ImageLoading";

const TopHallOfFame = ({ area, ...props }) => {
  const { gameDetail } = useSelector(({ game }) => game) ?? {};
  const { hallOfFame } = gameDetail;

  return (
    <div
      style={{ gridArea: getArea(area) }}
      className="mb-hidden modal-scroll bg-[#18181899] border-[2px] border-pink-600 rounded-[10px] text-white overflow-x-hidden overflow-y-auto relative"
      {...props}
    >
      <div className="text-[28px] font-semibold bg-black py-2.5 text-center top-0 sticky">
        Hall of Fame
      </div>

      <div className="flex flex-col gap-4 text-white p-5">
        {hallOfFame?.length > 0 &&
          hallOfFame?.map((e, i) => <Item key={i} item={e} />)}
      </div>
    </div>
  );
};

export default TopHallOfFame;

const Item = ({ item, ...props }) => {
  const { user, zera_earned } = item ?? {};
  const { avatar, username, quote } = user ?? {};

  if (zera_earned === 0) return;

  return (
    <Link href={`/hall-of-fame/${username}`}>
      <div className="bg-blur-600 p-2.5 rounded-[10px] flex justify-between cursor-pointer h-[84px] max-h-[84px] overflow-hidden">
        <div className="flex w-full">
          <ImageLoading
            src={avatar}
            alt=""
            className="min-w-[62px] w-[62px] h-[62px] rounded-full object-cover"
          />
          {/* user info */}
          <div className="px-2.5 w-full flex-1">
            <h2 className="text-base font-bold overflow-hidden text-ellipsis w-full overflow-wrap-anywhere whitespace-normal ">
              {username}
            </h2>
            <p className="text-xs font-medium overflow-wrap-anywhere whitespace-normal overflow-hidden text-ellipsis">
              {quote}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 pl-1.5 border-transparent border-l-white  border-[1px] min-w-20 w-20 max-w-20 justify-end">
          <span className="text-sm font-bold">{zera_earned}</span>
          <IconCoin className="w-[18px]" />
        </div>
      </div>
    </Link>
  );
};
