/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import GameDetailGrid from "@/components/ui/GameDetailGrid";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import {
  getAllCategories,
  getGameByCategorySlug,
  getGameDetailBySlug,
  getHallOfFameByGameSlug,
} from "@/services/game.service";
import { useRouter } from "next/router";
import { isEmpty} from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "@/hooks/useApi";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";
import { getAllAdvertisements } from "@/services/advertisements.service";

const HALL_OF_FAME_LIMIT = 10;

const GameDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { call } = useApi();

  const [isValidPage, setIsValidPage] = useState();
  const [seo, setSeo] = useState();

  const { categories } =
    useSelector(({ game: { gameIndex } }) => gameIndex) ?? {};

  useEffect(() => {
    if (!router.query || isEmpty(router.query)) return;

    if (Object.values(router.query).includes("undefined"))
      return setIsValidPage(false);

    getGameDetailBySlug(dispatch, router.query["game-slug"])
      .then((data) => {
        setIsValidPage(
          !!data && data?.superslug?.value === router.query["superslug"]
        );

        const { seo_title, seo_description } = data ?? {};
        setSeo({ seo_title, seo_description });
        const { game_category } = data ?? {};
        if (!game_category?.slug) return;

        getGameByCategorySlug(dispatch, game_category?.slug);
      })
      .catch(() => setIsValidPage(false));

    Promise.all([
      call(getAllCategories(dispatch)),
      call(
        getHallOfFameByGameSlug(
          dispatch,
          router.query["game-slug"],
          HALL_OF_FAME_LIMIT
        )
      ),
      call(getAllAdvertisements(dispatch)),
    ]);
  }, [router.query]);

  const title = {
    true: `${seo?.seo_title?.toUpperCase()} - Play ${seo?.seo_title}`,
    false: "404 not found",
  };

  return (
    <>
      <SEO title={title[isValidPage]} description={seo?.seo_description} />

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
