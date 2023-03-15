/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";

import MainLayout from "@/layouts/MainLayout";

import { useDispatch } from "react-redux";
import { useApi } from "@/hooks/useApi";
import ArticleCategoryGrid from "@/components/ui/ArticleCategoryGrid";
import SEO from "@/components/other/SEO";
import { getAllArticleCategory } from "@/services/article.service";

const ArticleCategories = () => {
  const dispatch = useDispatch();
  const { call } = useApi();

  const params = { page: 1, limit: 200 };

  useEffect(() => {
    call(getAllArticleCategory(dispatch, params));
  }, []);

  return (
    <>
      <SEO title={"Article categories"} />

      <MainLayout>
        <ArticleCategoryGrid />
      </MainLayout>
    </>
  );
};

export default ArticleCategories;
