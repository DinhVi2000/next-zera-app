/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import HallOfFame from "@/components/hall-of-fame/HallOfFame";
import SEO from "@/components/other/SEO";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";

import { useRouter } from "next/router";

import { setHallOfFame } from "@/services/user.service";

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
        apiURL.get.hall_of_fame_by_username(query?.username),
        null,
        setHallOfFame
      )
        .then((data) => setIsValidPage(!isEmpty(data)))
        .catch(() => setIsValidPage(false));
  }, [query]);

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
