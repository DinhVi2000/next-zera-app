/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useEffect } from "react";

import MainLayout from "@/layouts/MainLayout";

import { useDispatch, useSelector } from "react-redux";
import { useApi } from "@/hooks/useApi";
import SEO from "@/components/other/SEO";
import { getAllCategories } from "@/services/game.service";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import PreviousRouter from "@/components/previousRouter/PreviousRouter";

const CategoryTags = () => {
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
      <SEO title="Game tags" />

      <MainLayout>
        <GameTagsWrapper />
      </MainLayout>
    </>
  );
};

export default CategoryTags;

const GameTagsWrapper = memo(function GameTagsWrapperComponent() {
  return (
    <div className="w-responsive">
      <div className="bg-blur-800 rounded-2xl py-8 px-7 w-responsive border-[5px] border-pink-400">
        <PreviousRouter className="text-white" />

        <h1 className="text-white text-[40px] font-bold mb-5">All Game Tags</h1>

        <div className="flex flex-wrap gap-x-[11px] gap-y-5">
          <div className="py-2 px-5 rounded-[20px] bg-white text-xs font-bold uppercase">
            Car game
          </div>
        </div>
      </div>
    </div>
  );
});
