/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import Head from "next/head";

import MainLayout from "@/layouts/MainLayout";

import { useToast } from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import {
  getHallOfFameByUsername,
  setHallOfFame,
} from "@/services/user.service";

import { notifyErrorMessage } from "@/utils/helper";

import HallOfFame from "@/components/other/HallOfFame";
import { useAuthContext } from "@/context/auth-context";
import SEO from "@/components/other/SEO";
import { STATUS } from "@/utils/constant";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import { Fragment } from "react";

const MyHallOfFamePage = () => {
  const { get } = useApi();
  const { userInfo, verifyStatus } = useAuthContext();

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (verifyStatus === STATUS.SUCCESS)
      get(
        apiURL.get.hall_of_fame_by_username(userInfo?.username),
        null,
        setHallOfFame
      )
        .then(() => setIsValidPage(true))
        .catch(() => setIsValidPage(false));
  }, [verifyStatus]);

  return (
    <Fragment>
      <SEO title={"My Hall Of Fame"} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <HallOfFame />
        </MainLayout>
      </HandleNotFoundPage>
    </Fragment>
  );
};

export default MyHallOfFamePage;
