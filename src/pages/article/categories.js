/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import { useDispatch } from "react-redux";
import { useApi } from "@/hooks/useApi";
import ArticleCategoryGrid from "@/components/ui/ArticleCategoryGrid";
import SEO from "@/components/other/SEO";
import { getAllArticleCategory } from "@/services/article.service";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SidebarMB from "@/components/responsive/SidebarMB";

const ArticleCategories = () => {
  const dispatch = useDispatch();
  const { call } = useApi();
  const [isValidPage, setIsValidPage] = useState();

  const params = { page: 1, limit: 200 };

  useEffect(() => {
    call(getAllArticleCategory(dispatch, params))
      .then(() => setIsValidPage(true))
      .catch(() => setIsValidPage(false));
  }, []);

  return (
    <>
      <SEO title={"Article categories"} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <div>
            <SidebarMB
              className={"tbl-flex mb-4"}
              childClassName={"static-important"}
            />
            <ArticleCategoryGrid />
          </div>
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
};

export default ArticleCategories;
