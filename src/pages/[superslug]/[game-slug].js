/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import GameDetailGrid from "@/components/ui/GameDetailGrid";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import {
  getAllCategories,
  getGameByCategorySlug,
  getGameDetailBySlug,
  getHallOfFameByGameSlug,
  getMessages,
} from "@/services/game.service";
import { useRouter } from "next/router";
import { isEmpty, isValidPath } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "@/hooks/useApi";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";
import { getAllAdvertisements } from "@/services/advertisements.service";
import { useSocketContext } from "@/context/socket-context";
import { useAuthContext } from "@/context/auth-context";
import { MODAL_NAME, SOCKET_EVENT, STATUS } from "@/utils/constant";
import { useModalContext } from "@/context/modal-context";
import Head from "next/head";

const HALL_OF_FAME_LIMIT = 10;

const GameDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { call } = useApi();
  const { query } = router;

  const [isValidPage, setIsValidPage] = useState();
  const [seo, setSeo] = useState();

  const { categories } =
    useSelector(({ game: { gameIndex } }) => gameIndex) ?? {};

  const {
    socketCLI,
    setConnect,
    setCountdownStatus,
    isCountdown,
    setIsCountdown,
    timeDecrease,
  } = useSocketContext();
  const { getActivities } = useAuthContext();
  const { openModal } = useModalContext();

  // on events for anonymous
  useEffect(() => {
    if (!socketCLI) return;
    socketCLI.on(SOCKET_EVENT.OUT_OF_TIME, () => openModal(MODAL_NAME.BUYTIME));
  }, [socketCLI]);

  // on events for anonymous
  useEffect(() => {
    if (!socketCLI) return;

    socketCLI.on(SOCKET_EVENT.OUT_OF_TIME, () => {
      openModal(MODAL_NAME.BUYTIME);
    });
  }, [socketCLI]);

  useEffect(() => {
    setConnect(true);
    return () => setConnect(false);
  }, []);

  useEffect(() => {
    setIsValidPage();
    if (!isValidPath(query, setIsValidPage)) return;
    getGameDetailBySlug(dispatch, query["game-slug"])
      .then((data) => {
        setIsValidPage(!!data && data?.superslug?.value === query["superslug"]);

        const { seo_title, seo_description } = data ?? {};
        setSeo({ seo_title, seo_description });
        const { game_category } = data ?? {};
        if (!game_category?.slug) return;
        getGameByCategorySlug(dispatch, game_category?.slug);

        getMessages(dispatch, game_category?.id);
      })
      .catch(() => setIsValidPage(false));

    Promise.all([
      call(getAllCategories(dispatch)),
      call(
        getHallOfFameByGameSlug(
          dispatch,
          query["game-slug"],
          HALL_OF_FAME_LIMIT
        )
      ),
      call(getAllAdvertisements(dispatch)),
      getActivities(),
    ]);
  }, [query]);

  // handle reset state when router change
  useEffect(() => {
    if (!socketCLI || isEmpty(query) || !isCountdown) return;

    setCountdownStatus(STATUS.INIT);
    setIsCountdown(false);
    timeDecrease.current = 0;

    socketCLI.emit(SOCKET_EVENT.STOP_PLAY);
  }, [query, socketCLI]);

  const title = {
    true:
      seo?.seo_title &&
      `${seo?.seo_title?.toUpperCase()} - Play ${seo?.seo_title}`,
    false: "404 not found",
  };

  return (
    <Fragment>
      {/* <SEO title={title[isValidPage]} description={seo?.seo_description} /> */}
      <Head>
        <title>Meta Tags — Preview, Edit and Generate</title>
        <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
        <meta
          name="description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta
          property="og:title"
          content="Meta Tags — Preview, Edit and Generate"
        />
        <meta
          property="og:description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta
          property="twitter:title"
          content="Meta Tags — Preview, Edit and Generate"
        />
        <meta
          property="twitter:description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        ></meta>
      </Head>

      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <div className="w-min">
            <GameDetailGrid />
            <GameCategoryGrid categories={categories} />
          </div>
        </MainLayout>
      </HandleNotFoundPage>
    </Fragment>
  );
};

export default GameDetail;
