/* eslint-disable react-hooks/exhaustive-deps */
import GameCategoryDescription from "@/components/game/GameCategoryDescription";
import GameItem from "@/components/game/GameItem";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";
import GameCategoryDetailGrid from "@/components/ui/GameCategoryDetailGrid";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import { useApi } from "@/hooks/useApi";
import MainLayout from "@/layouts/MainLayout";
import {
  getAllCategories,
  getAllGame,
  getCategoryBySlug,
} from "@/services/game.service";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isValidPage, setIsValidPage] = useState();
  const [seo, setSeo] = useState();

  const { gameIndex } = useSelector(({ game }) => game) ?? {};
  const { games, categories } = gameIndex ?? {};

  const { call } = useApi();

  const params = { page: 1, limit: 50 };

  useEffect(() => {
    if (!router.query || isEmpty(router.query)) return;

    if (Object.values(router.query).includes("undefined"))
      return setIsValidPage(false);

    getCategoryBySlug(dispatch, router.query["category-slug"])
      .then((data) => {
        const { game_category } = data ?? {};
        setSeo({
          title: game_category?.label,
          description: game_category?.description,
        });

        setIsValidPage(
          !!game_category &&
            game_category?.superslug?.value === router.query["superslug"]
        );
      })
      .catch(() => setIsValidPage(false));

    Promise.all([
      call(getAllGame(dispatch, params)),
      call(getAllCategories(dispatch, params)),
    ]);
  }, [router.query]);

  return (
    <>
      <SEO title={seo?.title} description={seo?.description} />

      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <div className="w-min">
            <GameCategoryDetailGrid />
            <GameGrid games={games} />
            <GameCategoryGrid categories={categories} />
            <GameCategoryDescription />
          </div>
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
};

export default CategoryDetail;

const GameGrid = memo(function GameGridComponent({ games }) {
  return (
    <div className="grid-responsive grid gap-4 mt-[94px]">
      {games?.map((e, i) => (
        <GameItem
          key={e?.id}
          id={e?.id}
          index={i}
          thumbnail={e?.thumbnail}
          style={{ gridArea: "auto" }}
          title={e?.title}
          slug={e?.slug}
          superslug={e?.superslug}
        ></GameItem>
      ))}
    </div>
  );
});
