/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useMemo, useState } from "react";

import { HALL_OF_FAME_TAB } from "@/utils/constant";

import RankingTable from "./RankingTable";
import Rank from "./Rank";

import { useSelector } from "react-redux";
import SidebarMB from "../responsive/SidebarMB";

const HallOfFameWrapper = () => {
  const { hallOfFame } = useSelector(({ user }) => user) ?? {};

  const [tab, setTab] = useState(HALL_OF_FAME_TAB[0]);

  const handleChangeTab = (i) => {
    setTab(HALL_OF_FAME_TAB[i]);
  };

  const isNotNull = useMemo(
    () => !Object.values(hallOfFame).includes(null),
    [hallOfFame]
  );

  const tabStyle = {
    true: "bg-pink-800 text-white border-pink-400",
    false: "bg-violet-900 text-[#ffffffb3] border-violet-500 ",
  };

  return (
    <div>
      <SidebarMB
        className={"tbl-flex mb-4"}
        childClassName={"static-important"}
      />
      <div className="text-white w-responsive bg-blur-800 border-[5px] border-pink-400 pt-2.5 rounded-[20px] p-[62px] max-[550px]:p-3">
        {/* title */}
        <div className="w-full flex justify-center mb-14 max-[551px]:zoom-70">
          <span className="bg-pink-800 rounded-[20px] py-2.5 px-[30px] text-[40px] shadow-title font-bold">
            Hall Of Fame
          </span>
        </div>

        {/* tabs */}
        <div className="flex gap-3 justify-center max-[551px]:zoom-50 max-[661px]:zoom-70">
          {HALL_OF_FAME_TAB.map(({ label, value }, i) => (
            <div
              key={i}
              className={`py-2.5 px-9 cursor-pointer rounded-t-[20px] border border-b-transparent text-base font-bold hover:text-white 
                          ${tabStyle[tab.value === value]}`}
              onClick={() => handleChangeTab(i)}
            >
              {label}
            </div>
          ))}
        </div>

        {/* ranking wrapper */}
        <div className="border-[5px] border-pink-400 rounded-[20px] py-[50px] px-20 max-[881px]:px-5 transition-all">
          {/* top 1 2 3 */}
          <div className="flex flex-wrap gap-[30px] justify-center mb-6 h-[350px] max-[1321px]:h-[730px] max-[1211px]:h-[1066px]">
            <Rank
              places={2}
              tab={tab}
              data={isNotNull && hallOfFame[tab.value][1]}
            />
            <Rank
              places={1}
              tab={tab}
              data={isNotNull && hallOfFame[tab.value][0]}
            />
            <Rank
              places={3}
              tab={tab}
              data={isNotNull && hallOfFame[tab.value][2]}
            />
          </div>

          {/* table */}
          <RankingTable tab={tab} />
        </div>
      </div>
    </div>
  );
};

export default HallOfFameWrapper;
