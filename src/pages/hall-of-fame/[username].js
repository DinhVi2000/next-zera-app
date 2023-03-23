/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import HallOfFame from "@/components/other/HallOfFame";
import SEO from "@/components/other/SEO";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";

import { useRouter } from "next/router";
import { setHallOfFame } from "@/services/user.service";
import { isEmpty, isValidPath } from "@/utils/helper";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";
import { useAuthContext } from "@/context/auth-context";
import { staticPaths } from "@/utils/$path";
import { STATUS } from "@/utils/constant";

const HallOfFamePage = () => {
  const { get } = useApi();
  const router = useRouter();

  const { verifyStatus, userInfo } = useAuthContext();

  const { query } = router ?? {};

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (isValidPath(query, setIsValidPage) && verifyStatus === STATUS.SUCCESS) {
      if (userInfo.username === query.username) {
        router.push(staticPaths.my_hall_of_fame);
        return;
      }
      get(
        apiURL.get.hall_of_fame_by_username(query?.username),
        null,
        setHallOfFame
      )
        .then((data) => setIsValidPage(!isEmpty(data)))
        .catch(() => setIsValidPage(false));
    }
  }, [verifyStatus, query]);

  return (
    <Fragment>
      <SEO title={`Hall of fame - ${query?.username}`} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <HallOfFame></HallOfFame>
        </MainLayout>
      </HandleNotFoundPage>
    </Fragment>
  );
};

export default HallOfFamePage;
