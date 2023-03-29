/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import AchievementWrapper from "@/components/achievements/AchievementWrapper";
import SEO from "@/components/other/SEO";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";

import { useRouter } from "next/router";

import { setAchievement, setHallOfFame } from "@/services/user.service";

import { isEmpty, isValidPath } from "@/utils/helper";

import { useApi } from "@/hooks/useApi";

import { apiURL } from "@/utils/$apiUrl";

const HallOfFamePage = () => {
  const { get } = useApi();
  const router = useRouter();

  const { query } = router ?? {};

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (isValidPath(query, setIsValidPage))
      get(
        apiURL.get.achievements_by_username(query?.username),
        null,
        setAchievement
      )
        .then((data) => setIsValidPage(!isEmpty(data)))
        .catch(() => setIsValidPage(false));
  }, [query]);

  return (
    <Fragment>
      <SEO title={`Achievements - ${query?.username}`} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <AchievementWrapper></AchievementWrapper>
        </MainLayout>
      </HandleNotFoundPage>
    </Fragment>
  );
};

export default HallOfFamePage;
