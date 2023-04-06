/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useEffect } from "react";

import MainLayout from "@/layouts/MainLayout";

import { useDispatch, useSelector } from "react-redux";
import { useApi } from "@/hooks/useApi";
import SEO from "@/components/other/SEO";
import { getAllCategories } from "@/services/game.service";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import SidebarMB from "@/components/responsive/SidebarMB";

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
    <Fragment>
      <SEO title="Game categories" />
      <MainLayout>
        <div>
          <SidebarMB
            className={"tbl-flex"}
            childClassName={"static-important"}
          />
          <GameCategoryGrid categories={categories} />
        </div>
      </MainLayout>
    </Fragment>
  );
};

export default Categories;
