import { IconSortDown } from "@/resources/icons";
import React, { memo } from "react";

const RankingTable = ({ className, ...props }) => {
  return (
    <div className={`${className} w-full max-w-[1000px] mx-auto`} {...props}>
      <header>
        <div className="w-full flex justify-between px-[66px] relative mb-5">
          <span className="text-base text-pink-400 font-medium">Place</span>
          <span className="text-base text-pink-400 font-medium absolute left-1/2 -translate-x-1/2">
            Username
          </span>
          <span className="text-base text-pink-400 font-medium cursor-pointer">
            <span className="mr-1.5">Zera</span>
            <IconSortDown className="w-3 h-2 inline-block" />
          </span>
        </div>
      </header>
      <section>
        <div className="flex flex-col gap-[5px]">
          {Array(9)
            .fill(0)
            .map((e, i) => (
              <RankingItem key={i} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default RankingTable;

const RankingItem = memo(function Component() {
  return (
    <div className="bg-[#83184380] w-full relative flex justify-between rounded-[10px] py-[15px] px-20 ">
      <span>4</span>
      <span className="absolute left-1/2 -translate-x-1/2 ">richaricon</span>
      <span>7000</span>
    </div>
  );
});
