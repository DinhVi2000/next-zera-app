import React, { useEffect, useState } from "react";

import Head from "next/head";

import ArticleDetailWrapper from "@/components/other/ArticleDetailWrapper";

import MainLayout from "@/layouts/MainLayout";

import { getArticleById } from "@/services/article.service";

import { notifyErrorMessage } from "@/utils/helper";

import { isEmpty } from "lodash";

import { useRouter } from "next/router";

const ArticleDetail = () => {
  const router = useRouter();

  const [article, setArticle] = useState();

  const [params, setParams] = useState();

  const handleGetArticleDetailData = async () => {
    try {
      const { data } = (await getArticleById(params?.articleId)) ?? {};
      setArticle(data);
    } catch (error) {
      notifyErrorMessage(error);
    }
  };

  useEffect(() => {
    if (!params || isEmpty(params)) return;

    handleGetArticleDetailData();
  }, [params]);

  useEffect(() => {
    setParams(router.query);
  }, [router]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <ArticleDetailWrapper article={article} />
      </MainLayout>
    </>
  );
};

export default ArticleDetail;
