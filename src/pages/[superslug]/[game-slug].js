/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";

import GameDetailGrid from "@/components/ui/GameDetailGrid";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import {
  getAllCategories,
  getGameByCategoryId,
  getGameDetailBySlug,
  getHallOfFameByGameSlug,
} from "@/services/game.service";
import { useRouter } from "next/router";
import { isEmpty, notifyErrorMessage } from "@/utils/helper";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "@/hooks/useApi";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";

const HALL_OF_FAME_LIMIT = 10;

const GameDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { call } = useApi();

  const [isValidPage, setIsValidPage] = useState();

  const { categories } =
    useSelector(({ game: { gameIndex } }) => gameIndex) ?? {};

  useEffect(() => {
    if (!router.query || isEmpty(router.query)) return;

    if (typeof isValidPage === "undefined")
      getGameDetailBySlug(dispatch, router.query["game-slug"])
        .then((data) => {
          setIsValidPage(
            !!data && data?.superslug?.value === router.query["superslug"]
          );

          const { game_category } = data ?? {};
          if (!game_category?.id) return;

          getGameByCategoryId(dispatch, game_category?.id);
        })
        .catch(() => setIsValidPage(false));

    if (isValidPage)
      Promise.all([
        call(getAllCategories(dispatch)),
        call(
          getHallOfFameByGameSlug(
            dispatch,
            router.query["game-slug"],
            HALL_OF_FAME_LIMIT
          )
        ),
      ]);
  }, [router.query, isValidPage]);

  return (
    <>
      <Head>
        <title>Game detail</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <div className="w-min">
            <GameDetailGrid />
            <GameCategoryGrid categories={categories} />
          </div>
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
};

export default GameDetail;
