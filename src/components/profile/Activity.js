/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { notifyErrorMessage } from "@/utils/helper";

import { MODAL_NAME } from "@/utils/constant";
import ListGameActivities from "./ListGameActivities";
import GameItem from "../game/GameItem";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";

function Activities() {
  const { userInfo } = useAuthContext();

  return (
    <div className="h-full min-h-[1072px] w-[60%] max-[1176px]:w-full max-[1176px]:mt-5 bg-[#00000080] rounded-[20px] flex flex-col items-center pb-[100px]">
      <h2 className="rounded-t-[20px] bg-[#EC4899] py-[16px] pl-[16px] text-[28px] font-bold w-full text-center">
        Activities
      </h2>

      {userInfo?.mostPlayed ? (
        <>
          <h3 className="text-[28px] font-bold">Most played</h3>
          <div className="w-[314px] h-[204px] mt-3 mb-5 max-[400px]:w-[90%]">
            <GameItem
              id={userInfo?.mostPlayed?.game_detail?.id}
              thumbnail={userInfo?.mostPlayed?.game_detail?.thumbnail}
              title={userInfo?.mostPlayed?.game_detail?.title}
              slug={userInfo?.mostPlayed?.game_detail?.slug}
              superSlug={userInfo?.mostPlayed?.game_detail?.superslug}
            ></GameItem>
          </div>
        </>
      ) : (
        <div>
          <Link
            href={"/"}
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
        listGame={userInfo?.recentGames}
        payload={"RECENT_GAMES"}
        isModal={MODAL_NAME.VIEW_ALL_GAMES}
      />
      <ListGameActivities
        listGame={userInfo?.loved}
        payload={"LOVED_GAMES"}
        isModal={MODAL_NAME.VIEW_ALL_GAMES}
      />
      <ListGameActivities
        listGame={userInfo?.playlist}
        payload={"PLAYLIST"}
        isModal={MODAL_NAME.VIEW_ALL_GAMES}
      />
      <ListGameActivities
        listGame={userInfo?.purchaseHistory}
        payload={"PURCHASE_HISTORY"}
        isModal={MODAL_NAME.VIEW_PURCHASE_HISTORY}
      />
    </div>
  );
}

export default Activities;
