/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";

import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";
import ArticleGrid from "@/components/ui/ArticleGrid";

import MainLayout from "@/layouts/MainLayout";

import { useApi } from "@/hooks/useApi";

import { apiURL } from "@/utils/$apiUrl";
import { isValidPath } from "@/utils/helper";

const ArticlesTag = () => {
  const router = useRouter();
  const { get } = useApi();

  const { query } = router;

  const [articles, setArticles] = useState();

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (isValidPath(query, setIsValidPage))
      get(apiURL.get.articles_by_tag(query["tag-slug"]))
        .then(({ rows }) => {
          const articleList = rows?.map((e) => e?.article);
          setArticles(articleList);
          setIsValidPage(true);
        })
        .catch(() => setIsValidPage(false));
  }, [query]);

  return (
    <Fragment>
      <SEO title={"Articles"} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <ArticleGrid articles={articles} />
        </MainLayout>
      </HandleNotFoundPage>
    </Fragment>
  );
};

export default ArticlesTag;
