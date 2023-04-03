import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";

import Activities from "@/components/profile/Activity";
import Rewards from "@/components/profile/Reward";
import InfoUser from "@/components/profile/InfoUser";
import SEO from "@/components/other/SEO";
import SidebarMB from "@/components/responsive/SidebarMB";
import Stats from "@/components/profile/Stats";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import { sleep } from "@/utils/helper";
import ListGame from "@/components/profile/ListGame";
import Playlist from "@/components/profile/Playlist";

function Profile() {
  const [isValidPage, setIsValidPage] = useState();
  const [infoList, setInfoList] = useState();
  const [isOpenTab, setIsOpenTab] = useState(false);

  useEffect(() => {
    sleep(200).then(() => {
      setIsValidPage(true);
    });
  }, []);

  return (
    <>
      <SEO title={"User profile"} />

      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <div className="w-responsive">
            <SidebarMB
              className={"tbl-flex"}
              childClassName={"static-important mb-5"}
            />
            <div className="text-white">
              <InfoUser />

              <div className="mt-[50px] max-[990px]:mt-5">
                {!isOpenTab ? (
                  <div className="flex justify-between max-[1176px]:flex-col items-start gap-x-[18px] w-full max-[1178px]:pt-5 max-[990px]:pt-10 max-[650px]:pt-2">
                    <div className="w-[40%] max-[1176px]:w-full max-[1176px]:flex max-[1176px]:justify-between max-[550px]:flex-col">
                      <Stats />
                      <Rewards />
                    </div>
                    <Activities
                      setInfoList={setInfoList}
                      setIsOpenTab={setIsOpenTab}
                    />
                  </div>
                ) : (
                  <>
                    {infoList?.payload !== "PLAYLIST" ? (
                      <ListGame
                        setIsOpenTab={setIsOpenTab}
                        infoList={infoList}
                      />
                    ) : (
                      <Playlist
                        setIsOpenTab={setIsOpenTab}
                        infoList={infoList}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
}

export default Profile;
