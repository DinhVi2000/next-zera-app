/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Head from "next/head";

import MainLayout from "@/layouts/MainLayout";

import GameGrid from "@/components/ui/GameGrid";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import ArticleCategoryGrid from "@/components/ui/ArticleCategoryGrid";

import { getAllGame } from "@/services/game.service";

import { useApi } from "@/hooks/useApi";
import { getAllArticleCategory } from "@/services/article.service";
import SEO from "@/components/other/SEO";

export default function Home() {
  const dispatch = useDispatch();

  const { call } = useApi();

  const { gameIndex } = useSelector(({ game }) => game) ?? {};
  const { games, categories } = gameIndex ?? {};

  const params = { page: 1, limit: 200 };

  useEffect(() => {
    Promise.all([
      call(getAllGame(dispatch, params)),
      call(getAllArticleCategory(dispatch, params)),
    ]);
  }, []);

  return (
    <>
      <SEO title={"Online Games on Zera"} />

      <MainLayout>
        <div className="w-responsive">
          <GameGrid games={games} />
          <GameCategoryGrid categories={categories} />
          <ArticleCategoryGrid />
        </div>
      </MainLayout>
    </>
  );
}
