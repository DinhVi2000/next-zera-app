/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import ListGameActivities from "./ListGameActivities";
import GameItem from "../game/GameItem";
import Link from "next/link";
import { staticPaths } from "@/utils/$path";
import { useAuthContext } from "@/context/auth-context";

function Activities({ setInfoList, setIsOpenTab }) {
  const { activitiesInfo, getActivities } = useAuthContext();

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div className="h-full min-h-[1072px] w-[60%] max-[1176px]:w-full max-[1176px]:mt-5 bg-[#00000080] rounded-[20px] flex flex-col items-center pb-[100px]">
      <h2 className="rounded-t-[20px] bg-[#EC4899] py-[16px] pl-[16px] text-[28px] font-bold w-full text-center">
        Activities
      </h2>

      {activitiesInfo?.mostPlayed ? (
        <>
          <h3 className="text-[28px] font-bold">Most played</h3>
          <div className="w-[314px] h-[204px] mt-3 mb-5 max-[400px]:w-[90%]">
            <GameItem
              id={activitiesInfo?.mostPlayed?.game_detail?.id}
              thumbnail={activitiesInfo?.mostPlayed?.game_detail?.thumbnail}
              title={activitiesInfo?.mostPlayed?.game_detail?.title}
              slug={activitiesInfo?.mostPlayed?.game_detail?.slug}
              superslug={activitiesInfo?.mostPlayed?.game_detail?.superslug}
            ></GameItem>
          </div>
        </>
      ) : (
        <div>
          <Link
            href={staticPaths.home}
            className="flex-center flex-col text-lg text-center p-2"
          >
            You haven't played any games yet.
            <button className="btn-save-gradient px-5 py-2 mt-2">
              Play now!
            </button>
          </Link>
        </div>
      )}

      <ListGameActivities
        listGame={activitiesInfo?.recentlyPlayed}
        payload={"RECENT_GAMES"}
        setInfoList={setInfoList}
        setIsOpenTab={setIsOpenTab}
      />
      <ListGameActivities
        listGame={activitiesInfo?.lovedGame}
        payload={"LOVED_GAMES"}
        setInfoList={setInfoList}
        setIsOpenTab={setIsOpenTab}
      />
      <ListGameActivities
        listGame={activitiesInfo?.playlist}
        payload={"PLAYLIST"}
        setInfoList={setInfoList}
        setIsOpenTab={setIsOpenTab}
      />
      <ListGameActivities
        listGame={activitiesInfo?.purchaseHistory}
        payload={"PURCHASE_HISTORY"}
        setInfoList={setInfoList}
        setIsOpenTab={setIsOpenTab}
      />
    </div>
  );
}

export default Activities;
