/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Head from "next/head";

import MainLayout from "@/layouts/MainLayout";

import GameGrid from "@/components/ui/GameGrid";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import ArticleCategoryGrid from "@/components/ui/ArticleCategoryGrid";

import { getAllCategories, getAllGame } from "@/services/game.service";

import { useApi } from "@/hooks/useApi";
import { getAllArticleCategory } from "@/services/article.service";
import SEO from "@/components/other/SEO";
import { useAuthContext } from "@/context/auth-context";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import { useModalContext } from "@/context/modal-context";

export default function Home() {
  const dispatch = useDispatch();
  const { call } = useApi();

  const { openModal, closeModal } = useModalContext();
  const { userInfo, verifyStatus } = useAuthContext();

  const { gameIndex } = useSelector(({ game }) => game) ?? {};
  const { games, categories } = gameIndex ?? {};
  const params = { page: 1, limit: 200 };

  useEffect(() => {
    Promise.all([
      call(getAllGame(dispatch, params)),
      call(getAllCategories(dispatch, params)),
    ]);
  }, []);

  useEffect(() => {
    if (
      verifyStatus === STATUS.SUCCESS &&
      userInfo &&
      !userInfo?.isClaimDailyBonus
    ) {
      openModal(MODAL_NAME.DAILY_BONUS);
    }
  }, [userInfo]);

  return (
    <>
      <SEO title={"Online Games on Zera"} />

      <MainLayout>
        <div className="w-responsive">
          <GameGrid games={games} />
          <GameCategoryGrid categories={categories} />
        </div>
      </MainLayout>
    </>
  );
}
