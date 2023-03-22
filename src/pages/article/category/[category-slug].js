/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";
import ArticleGrid from "@/components/ui/ArticleGrid";

import MainLayout from "@/layouts/MainLayout";

import { useApi } from "@/hooks/useApi";

import { apiURL } from "@/utils/$apiUrl";
import { isValidPath } from "@/utils/helper";

const ArticleCategory = () => {
  const router = useRouter();
  const { get } = useApi();

  const { query } = router;

  const [articles, setArticles] = useState();
  const [articleInfo, setArticleInfo] = useState();

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (isValidPath(query, setIsValidPage))
      get(apiURL.get.articles_by_category(query["category-slug"]))
        .then((data) => {
          setIsValidPage(!!data);
          setArticles(data?.articles?.rows);
          setArticleInfo(data?.articleCategory);
        })
        .catch(() => setIsValidPage(false));
  }, [query]);

  return (
    <>
      <SEO title={"Articles"} />

      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <ArticleGrid
            articles={articles}
            articleInfo={articleInfo}
            articleTags={[]}
          />
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
};

export default ArticleCategory;
