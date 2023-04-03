/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth-context";
import { Tooltip, useToast } from "@chakra-ui/react";
import { IconCopy, IconPlus } from "@/resources/icons";
import { statsUser } from "@/services/user.service";
import {
  getBetweenTwoDate,
  notifyErrorMessage,
  notifySuccessMessage,
} from "@/utils/helper";
import Link from "next/link";

function Stats() {
  const { userInfo } = useAuthContext();
  const [stats, setStats] = useState([]);
  const toast = useToast();

  const getStatsUser = async () => {
    try {
      const res = await statsUser();
      setStats(res?.data);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    getStatsUser();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${userInfo?.ref_link}`);
    notifySuccessMessage(toast, "Copy successful");
  };

  return (
    <div className="rounded-[20px] bg-[#00000080] max-[1176px]:w-[49%] max-[550px]:w-full">
      <h4 className="rounded-t-[20px] bg-[#EC4899] py-[16px] pl-[16px] text-[28px] font-bold">
        Stats
      </h4>
      <div className="pl-[28px] text-[28px] max-[1176px]:text-[20px] max-[400px]:text-[16px]">
        <Tooltip label="Purchase more playtime">
          <Link href={"/shop#playtimes"}>
            <div className="mt-[34px] max-[1176px]:mt-[15px] flex items-center cursor-pointer">
              {Math.floor(userInfo?.playtime / 60)} minutes left
              <IconPlus className="w-9 h-9 ml-4" />
            </div>
          </Link>
        </Tooltip>
        <p className="mt-[34px] max-[1176px]:mt-[15px]">
          Playstreak: {userInfo?.playstreak} days
        </p>
        <p className="text-[16px] opacity-60">
          Highest streak: {userInfo?.highest_playstreak} days
        </p>
        <p className="mt-[34px] max-[1176px]:mt-[15px]">
          {stats?.played_game} games played
        </p>
        <p className="mt-[34px] max-[1176px]:mt-[15px]">
          {stats?.loved_game} games loved
        </p>
        <p className="mt-[34px] max-[1176px]:mt-[15px] max-[1176px]:mb-[60px] mb-[100px]">
          Joined {getBetweenTwoDate(stats?.joined)}
        </p>
      </div>
      <div className="rounded-b-[20px] bg-[#8B5CF6] py-[18px] px-4 flex items-center justify-center cursor-pointer">
        <Tooltip label="Copy" placement="bottom">
          <div className="flex-center" onClick={handleCopy}>
            Referral link:{" "}
            <p className="text-[#FBCFE8] ml-2 whitespace-nowrap overflow-hidden text-ellipsis w-[20%]">
              {userInfo?.username}
            </p>
            <IconCopy viewBox="0 0 30 30" className="ml-2" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default Stats;
