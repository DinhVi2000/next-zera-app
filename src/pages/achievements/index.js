/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import { setAchievement, setHallOfFame } from "@/services/user.service";

import AchievementWrapper from "@/components/achievements/AchievementWrapper";
import { useAuthContext } from "@/context/auth-context";
import SEO from "@/components/other/SEO";
import { STATUS } from "@/utils/constant";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import { Fragment } from "react";

const MyHallOfFamePage = () => {
  const { get } = useApi();
  const [isValidPage, setIsValidPage] = useState();

  const { userInfo, verifyStatus } = useAuthContext();

  useEffect(() => {
    if (verifyStatus === STATUS.SUCCESS) {
      get(
        apiURL.get.achievements_by_username(userInfo?.username),
        null,
        setAchievement
      )
        .then(() => setIsValidPage(true))
        .catch(() => setIsValidPage(false));
    }
  }, [verifyStatus]);

  return (
    <Fragment>
      <SEO title={"Achievement"} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <AchievementWrapper />
        </MainLayout>
      </HandleNotFoundPage>
    </Fragment>
  );
};

export default MyHallOfFamePage;
