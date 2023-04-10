/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

import { QUANTITY_BY_TAB } from "@/utils/constant";

import Pagination from "@/components/pagination/Pagination";

import { usePagination } from "@/hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";

import { IconSortDown } from "@/resources/icons";

import { setHallOfFame } from "@/services/user.service";

import { abbreviateNumber, sleep } from "@/utils/helper";
import { Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { dynamicPaths } from "@/utils/$path";
import Empty from "../empty/Empty";

const ITEM_PER_PAGE = 10;

const RankingTable = ({ className, tab: { value, label }, ...props }) => {
  const dispatch = useDispatch();

  const { hallOfFame } = useSelector(({ user }) => user) ?? {};

  const [isReverse, setIsReverse] = useState(false);
  const [isOpen, setisOpen] = useState(true);

  const listSlice = useMemo(
    () => hallOfFame[value]?.slice(3, hallOfFame[value]?.length),
    [hallOfFame[value]]
  );

  const { currentItems, handlePageClick } = usePagination(
    ITEM_PER_PAGE,
    listSlice
  );

  const hanldeReverseItems = () => {
    setIsReverse((prev) => !prev);

    let itemsReverse = {};
    itemsReverse[value] = hallOfFame[value].slice().reverse();
    dispatch(setHallOfFame({ ...hallOfFame, ...itemsReverse }));
  };

  // reload
  useEffect(() => {
    if (!value) return;
    setisOpen(false);
    sleep(1).then(() => setisOpen(true));
  }, [value]);

  return (
    <div className={`${className} w-full max-w-[1000px] mx-auto`} {...props}>
      {/* head */}
      <header>
        <div className="w-full flex justify-between relative mb-5 px-[66px] max-[551px]:px-0">
          <span className="text-base text-pink-400 font-medium">Place</span>
          <span className="text-base text-pink-400 font-medium absolute left-1/2 -translate-x-1/2">
            Username
          </span>

          {/* reverse button */}
          <span
            className="text-base text-pink-400 font-medium cursor-pointer"
            onClick={hanldeReverseItems}
          >
            <span className="mr-1.5">{label}</span>
            <IconSortDown
              className={`w-3 h-2 inline-block ${isReverse && "rotate-180"}`}
            />
          </span>
        </div>
      </header>

      {/* items */}
      <section>
        <div className="flex flex-col gap-[5px]">
          {currentItems?.map((e, i) => (
            <RankingItem
              key={i}
              place={e?.rank}
              user={e?.user}
              quantity={QUANTITY_BY_TAB[value](e)}
            />
          ))}

          {currentItems?.length === 0 && <Empty className={"h-[400px]"} />}
        </div>
        {/* pagination */}
        {isOpen && (
          <Pagination
            items={hallOfFame[value]}
            itemsPerPage={ITEM_PER_PAGE}
            onPageChange={handlePageClick}
          />
        )}
      </section>
    </div>
  );
};

export default RankingTable;

const RankingItem = memo(function Component({ place, user, quantity }) {
  const { username } = user ?? {};

  return (
    <Link href={dynamicPaths.achievements_by_username(username)}>
      <div
        className="bg-[#83184380] w-full relative flex justify-between rounded-[10px]
                    py-[15px] px-20 max-[551px]:px-3"
      >
        <span>{place}</span>
        <Tooltip label={username}>
          <span className="absolute left-1/2 -translate-x-1/2 hover:underline-offset-1 hover:underline hover:text-pink-500 text-center text-ellipsis whitespace-nowrap overflow-hidden w-[150px]">
            {username}
          </span>
        </Tooltip>

        <Tooltip label={quantity > 999 && quantity} placement="top">
          <span>{abbreviateNumber(quantity)}</span>
        </Tooltip>
      </div>
    </Link>
  );
});
