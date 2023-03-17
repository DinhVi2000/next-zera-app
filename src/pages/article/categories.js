/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import { useDispatch } from "react-redux";
import { useApi } from "@/hooks/useApi";
import ArticleCategoryGrid from "@/components/ui/ArticleCategoryGrid";
import SEO from "@/components/other/SEO";
import { getAllArticleCategory } from "@/services/article.service";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";

const ArticleCategories = () => {
  const dispatch = useDispatch();
  const { call } = useApi();
  const [isValidPage, setIsValidPage] = useState();

  const params = { page: 1, limit: 200 };

  useEffect(() => {
    call(getAllArticleCategory(dispatch, params));
  }, []);

  return (
    <>
      <SEO title={"Article categories"} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <ArticleCategoryGrid />
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
};

export default ArticleCategories;
