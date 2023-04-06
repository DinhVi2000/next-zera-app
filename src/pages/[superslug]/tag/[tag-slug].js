/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import GameItem from "@/components/game/GameItem";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import GameTagDetailGrid from "@/components/ui/GameTagDetailGrid";

import { useApi } from "@/hooks/useApi";

import MainLayout from "@/layouts/MainLayout";

import {
  getAllCategories,
  getAllGame,
  setGameDetailByTag,
} from "@/services/game.service";

import { apiURL } from "@/utils/$apiUrl";
import { isValidPath } from "@/utils/helper";

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [seo, setSeo] = useState();

  const { query } = router;

  const [isValidPage, setIsValidPage] = useState();

  const { gameIndex } = useSelector(({ game }) => game) ?? {};
  const { games, categories } = gameIndex ?? {};

  const { call, get } = useApi();

  const params = { page: 1, limit: 50 };

  useEffect(() => {
    if (isValidPath(query, setIsValidPage)) {
      get(apiURL.get.games_by_tag(query["tag-slug"]), null, setGameDetailByTag)
        .then((data) => {
          const { gameTag } = data ?? {};
          setIsValidPage(!!data);
          setSeo({
            title: gameTag.label,
            description: gameTag.description,
          });
        })
        .catch(() => {
          setIsValidPage(false);
        });
    }

    Promise.all([
      call(getAllGame(dispatch, params)),
      call(getAllCategories(dispatch, params)),
    ]);
  }, [query]);

  return (
    <Fragment>
      <SEO title={seo?.title} description={seo?.description} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <div className="w-min">
            <GameTagDetailGrid />
            <GameGrid games={games} />
            <GameCategoryGrid categories={categories} />
          </div>
        </MainLayout>
      </HandleNotFoundPage>
    </Fragment>
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
