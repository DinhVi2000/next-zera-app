/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";

import MainLayout from "@/layouts/MainLayout";

import { useDispatch, useSelector } from "react-redux";
import { useApi } from "@/hooks/useApi";
import SEO from "@/components/other/SEO";
import { getAllCategories } from "@/services/game.service";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";

const Categories = () => {
  const dispatch = useDispatch();
  const { call } = useApi();

  const { gameIndex } = useSelector(({ game }) => game) ?? {};
  const { categories } = gameIndex ?? {};
  const params = { page: 1, limit: 200 };

  useEffect(() => {
    call(getAllCategories(dispatch, params));
  }, []);

  return (
    <>
      <SEO title="Game categories" />

      <MainLayout>
        <GameCategoryGrid categories={categories} />
      </MainLayout>
    </>
  );
};

export default Categories;
