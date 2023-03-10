/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import Head from "next/head";

import MainLayout from "@/layouts/MainLayout";

import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { getHallOfFameByUsername } from "@/services/user.service";
import { isEmpty, notifyErrorMessage } from "@/utils/helper";
import { useDispatch } from "react-redux";
import HallOfFame from "@/components/other/HallOfFame";
import SEO from "@/components/other/SEO";

const HallOfFamePage = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();

  const [params, setParams] = useState();
  const [isValidPage, setIsValidPage] = useState(true);

  const handleGetHallOfFame = async () => {
    try {
      const { username } = params;

      getHallOfFameByUsername(dispatch, username);
    } catch (error) {
      notifyErrorMessage(toast, error);
      setIsValidPage(false);
    }
  };

  useEffect(() => {
    if (!params || isEmpty(params)) return;
    handleGetHallOfFame();
  }, [params]);

  useEffect(() => {
    setParams(router.query);
  }, [router]);

  // if (!isValidPage) return <PageNotFound />;

  return (
    <>
      <SEO title={`Hall of fame - ${params?.username}`} />

      <MainLayout>
        {/* content  */}
        <HallOfFame></HallOfFame>
      </MainLayout>
    </>
  );
};

export default HallOfFamePage;
