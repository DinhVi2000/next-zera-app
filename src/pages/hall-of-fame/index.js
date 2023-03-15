/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import Head from "next/head";

import MainLayout from "@/layouts/MainLayout";

import { useToast } from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import { getHallOfFameByUsername } from "@/services/user.service";

import { notifyErrorMessage } from "@/utils/helper";

import HallOfFame from "@/components/other/HallOfFame";
import { useAuthContext } from "@/context/auth-context";
import SEO from "@/components/other/SEO";
import { STATUS } from "@/utils/constant";

const MyHallOfFamePage = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const { userInfo, verifyStatus } = useAuthContext();

  const handleGetHallOfFame = async () => {
    try {
      getHallOfFameByUsername(dispatch, userInfo?.username);
    } catch (error) {
      notifyErrorMessage(toast, error);
    }
  };

  useEffect(() => {
    if (userInfo && verifyStatus === STATUS.SUCCESS) {
      handleGetHallOfFame();
    }
  }, [userInfo, verifyStatus]);

  // if (!isValidPage) return <PageNotFound />;
  return (
    <>
      <SEO title={"My Hall Of Fame"} />

      <MainLayout>
        {/* content  */}
        <HallOfFame></HallOfFame>
      </MainLayout>
    </>
  );
};

export default MyHallOfFamePage;
