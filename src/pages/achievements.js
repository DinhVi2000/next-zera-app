import SEO from "@/components/other/SEO";
import HallOfFameWrapper from "@/components/achievements/AchievementWrapper";
import MainLayout from "@/layouts/MainLayout";
import React, { Fragment } from "react";

const AchievementsPage = () => {
  return (
    <Fragment>
      <SEO title={"achievements"} />
      <MainLayout>
        <HallOfFameWrapper />
      </MainLayout>
    </Fragment>
  );
};

export default AchievementsPage;
