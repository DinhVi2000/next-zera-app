import React, { useEffect, useState } from "react";

import Head from "next/head";

import ArticleDetailWrapper from "@/components/other/ArticleDetailWrapper";

import MainLayout from "@/layouts/MainLayout";

import { getArticleBySlug } from "@/services/article.service";

import { isEmpty } from "lodash";

import { useRouter } from "next/router";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";

const ArticleDetail = () => {
  const router = useRouter();

  const [article, setArticle] = useState();

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (!router.query || isEmpty(router.query)) return;

    if (Object.values(router.query).includes("undefined"))
      return setIsValidPage(false);

    getArticleBySlug(router.query["article-slug"])
      .then((data) => {
        setIsValidPage(!!data);
        setArticle(data);
      })
      .catch(() => setIsValidPage(false));
  }, [router.query]);

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
