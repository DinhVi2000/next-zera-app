import React from "react";
import MainLayout from "@/layouts/MainLayout";

import Activities from "@/components/profile/Activity";
import Rewards from "@/components/profile/Reward";
import InfoUser from "@/components/profile/InfoUser";
import SEO from "@/components/other/SEO";
import SidebarMB from "@/components/responsive/SidebarMB";
import Stats from "@/components/profile/Stats";

function Profile() {
  return (
    <>
      <SEO title={"User profile"} />

      <MainLayout>
        <div className="w-responsive">
          <SidebarMB
            className={"tbl-flex"}
            childClassName={"static-important mb-5"}
          />
          <div className="text-white">
            <InfoUser />

            <div className="flex justify-between max-[1176px]:flex-col items-start mt-[50px] gap-x-[18px] max-[990px]:mt-5 w-full">
              <div className="w-[40%] max-[1176px]:w-full max-[1176px]:flex max-[1176px]:justify-between max-[550px]:flex-col">
                <Stats />
                <Rewards />
              </div>
              <Activities />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Profile;
