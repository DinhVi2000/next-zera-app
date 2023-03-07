/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { notifyErrorMessage } from "@/utils/helper";

import { MODAL_NAME } from "@/utils/constant";
import {
  getLovedGames,
  getMostPlayed,
  getPlaylist,
  getRecentlyGames,
} from "@/services/game.service";
import ListGameActivities from "./ListGameActivities";
import { getPurchaseHistory } from "@/services/user.service";
import GameItem from "../game/GameItem";
import Link from "next/link";

function Activities() {
  const toast = useToast();
  const [recentGames, setRecentGames] = useState([]);
  const [lovedGames, setLovedGames] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [mostPlayed, setMostPlayed] = useState("");

  const handleRecentlyPlayed = async () => {
    try {
      const recent = await getRecentlyGames();
      setRecentGames(recent?.data);
      const loved = await getLovedGames();
      setLovedGames(loved?.data);
      const playlist = await getPlaylist();
      setPlaylist(playlist?.data);
      const purchase = await getPurchaseHistory();
      setPurchaseHistory(purchase?.data);

      const mostPlayedGame = await getMostPlayed();
      setMostPlayed(mostPlayedGame?.data?.game_detail);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    handleRecentlyPlayed();
  }, []);

  return (
    <div className="w-[728px] bg-[#000000cc] rounded-[20px] flex flex-col items-center justify-center pt-[22px] pb-[100px]">
      <h2 className="text-[32px] mb-[30px] font-bold">Activities</h2>

      {mostPlayed ? (
        <>
          <h3 className="text-[28px] font-bold">Most played</h3>
          <div className="w-[314px] h-[204px] mt-3 mb-5">
            <GameItem
              id={mostPlayed?.id}
              thumbnail={mostPlayed?.thumbnail}
              title={mostPlayed?.title}
            ></GameItem>
          </div>
        </>
      ) : (
        <div>
          <Link href={"/"} className="flex-center flex-col text-lg">
            You haven't played any games yet.
            <button className="btn-save-gradient px-5 py-2 mt-2">
              Play now!
            </button>
          </Link>
        </div>
      )}

      <ListGameActivities
        listGame={recentGames}
        payload={"RECENT_GAMES"}
        isModal={MODAL_NAME.VIEW_ALL_GAMES}
      />
      <ListGameActivities
        listGame={lovedGames}
        payload={"LOVED_GAMES"}
        isModal={MODAL_NAME.VIEW_ALL_GAMES}
      />
      <ListGameActivities
        listGame={playlist}
        payload={"PLAYLIST"}
        isModal={MODAL_NAME.VIEW_ALL_GAMES}
      />
      <ListGameActivities
        listGame={purchaseHistory}
        payload={"PURCHASE_HISTORY"}
        isModal={MODAL_NAME.VIEW_PURCHASE_HISTORY}
      />
    </div>
  );
}

export default Activities;
