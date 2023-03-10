import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";

import { IconPlus, IconCopy } from "@/resources/icons";

import Activities from "@/components/profile/Activity";
import Rewards from "@/components/profile/Reward";
import InfoUser from "@/components/profile/InfoUser";
import { Tooltip, useToast } from "@chakra-ui/react";
import { useAuthContext } from "@/context/auth-context";
import { statsUser } from "@/services/user.service";
import { getBetweenTwoDate, notifyErrorMessage } from "@/utils/helper";
import SEO from "@/components/other/SEO";
function Profile() {
  const { userInfo } = useAuthContext();
  const toast = useToast();
  const [stats, setStats] = useState([]);

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
  };

  return (
    <>
      <SEO title={"User profile"} />

      <MainLayout>
        <div className="text-white">
          <InfoUser />

          <div className="flex mt-[50px] gap-x-[18px]">
            <div className="w-[427px]">
              <div className="rounded-[20px] bg-[#00000080]">
                <h4 className="rounded-t-[20px] bg-[#EC4899] py-[16px] pl-[16px] text-[28px] font-bold">
                  Stats
                </h4>
                <div className="pl-[28px] text-[28px]">
                  <p className="mt-[34px] flex items-center cursor-pointer">
                    {Math.floor(userInfo?.playtime / 60)} minutes left
                  </p>
                  <p className="mt-[34px]">
                    Playstreak: {userInfo?.playstreak} days
                  </p>
                  <p className="text-[16px] opacity-60">
                    Highest streak: {userInfo?.highest_playstreak} days
                  </p>
                  <p className="mt-[34px]">{stats?.played_game} games played</p>
                  <p className="mt-[34px]">{stats?.loved_game} games loved</p>
                  <p className="mt-[34px] mb-[100px]">
                    Joined {getBetweenTwoDate(stats?.joined)}
                  </p>
                </div>
                <div
                  className="rounded-b-[20px] bg-[#8B5CF6] py-[18px] flex items-center justify-center cursor-pointer"
                  onClick={handleCopy}
                >
                  <Tooltip label="Copy" placement="bottom">
                    <div className="flex items-center">
                      Referral link:{" "}
                      <span className="text-[#FBCFE8] ml-2 flex items-center">
                        {userInfo?.username}
                        <IconCopy viewBox="0 0 30 30" className="ml-2" />
                      </span>
                    </div>
                  </Tooltip>
                </div>
              </div>
              <Rewards />
            </div>
            <Activities />
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Profile;
