/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import { HALL_OF_FAME_TAB } from "@/utils/constant";

import RankingTable from "./RankingTable";
import Rank from "./Rank";

const HallOfFameWrapper = () => {
  const [tab, setTab] = useState(HALL_OF_FAME_TAB[0]);

  const handleChangeTab = (i) => {
    setTab(HALL_OF_FAME_TAB[i]);
  };

  return (
    <div
      className="text-white w-responsive bg-blur-800 border-[5px] border-pink-400 pt-2.5 rounded-[20px]
               p-[62px] max-[550px]:p-[30px]"
    >
      {/* title */}
      <div className="w-full flex justify-center mb-14">
        <span className="bg-pink-800 rounded-[20px] py-2.5 px-[30px] text-[40px] shadow-title font-bold">
          Achievements
        </span>
      </div>

      {/* tabs */}
      <div className="flex gap-3 justify-center">
        {HALL_OF_FAME_TAB.map(({ label, value }, i) => (
          <div
            key={i}
            className={`py-2.5 px-9 cursor-pointer rounded-t-[20px] border border-b-transparent text-base font-bold hover:text-white
                        ${
                          tab.value === value
                            ? "bg-pink-800 text-white border-pink-400"
                            : "bg-violet-900 text-[#ffffffb3] border-violet-500 "
                        }`}
            onClick={() => handleChangeTab(i)}
          >
            {label}
          </div>
        ))}
      </div>

      {/* ranking wrapper */}
      <div className="border-[5px] border-pink-400 rounded-[20px] py-[50px] px-20">
        <div className="flex gap-[30px] justify-center mb-6">
          <Rank places={2} tab={tab} />
          <Rank places={1} tab={tab} />
          <Rank places={3} tab={tab} />
        </div>

        <RankingTable />
      </div>

      {/* ranking table */}
    </div>
  );
};

export default HallOfFameWrapper;
