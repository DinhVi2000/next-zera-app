import SEO from "@/components/other/SEO";
import HallOfFameWrapper from "@/components/hall-of-fame/HallOfFameWrapper";
import MainLayout from "@/layouts/MainLayout";
import React, { Fragment, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";
import { HALL_OF_FAME_TAB } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setHallOfFame } from "@/services/user.service";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";

const AchievementsPage = () => {
  const dispatch = useDispatch();

  const { get } = useApi();

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    Promise.all(
      HALL_OF_FAME_TAB.map(({ value }, i) =>
        get(apiURL.get.my_hall_of_fame, {
          params: {
            sort: value,
            filter: "high_to_low",
          },
        }).then((data) => {
          let item = {};
          item[value] = data;
          dispatch(setHallOfFame(item));
        })
      )
    )
      .then(() => setIsValidPage(true))
      .catch(() => setIsValidPage(false));
  }, []);

  return (
    <Fragment>
      <SEO title={"Hall of fame"} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <HallOfFameWrapper />
        </MainLayout>
      </HandleNotFoundPage>
    </Fragment>
  );
};

export default AchievementsPage;
