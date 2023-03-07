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
      className="mb-hidden bg-[#18181899] border-[2px] border-pink-600 rounded-[10px] text-white overflow-auto relative"
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

  return (
    <Link href={`/hall-of-fame/${username}`}>
      <div className="bg-blur-600 p-2.5 rounded-[10px] flex justify-between cursor-pointer">
        <div className="flex">
          <ImageLoading
            src={avatar}
            alt=""
            className="min-w-[62px] h-[62px] rounded-full object-cover"
          />
          <div className="px-2.5">
            <h2 className="text-base font-bold">{username}</h2>
            <p className="text-xs font-medium">{quote}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 pl-1.5 border-transparent border-l-white  border-[1px] w-20 max-w-20 justify-end">
          <span className="text-sm font-bold">{zera_earned}</span>
          <IconCoin className="w-[18px]" />
        </div>
      </div>
    </Link>
  );
};
