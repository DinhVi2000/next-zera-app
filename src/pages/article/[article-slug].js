/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import ArticleDetailWrapper from "@/components/wrapper/ArticleDetailWrapper";

import MainLayout from "@/layouts/MainLayout";

import { useRouter } from "next/router";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";
import { isValidPath } from "@/utils/helper";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";

const ArticleDetail = () => {
  const router = useRouter();
  const { get } = useApi();

  const { query, asPath } = router;

  const [article, setArticle] = useState();

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (isValidPath(query, setIsValidPage))
      get(apiURL.get.article_by_slug(query["article-slug"]))
        .then((data) => {
          setIsValidPage(!!data);
          setArticle(data);
        })
        .catch(() => setIsValidPage(false));
  }, [query]);

  return (
    <>
      <SEO title={article?.title} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <ArticleDetailWrapper article={article} />
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
};

export default ArticleDetail;
