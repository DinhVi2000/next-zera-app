import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import SEO from "@/components/other/SEO";
import ArticleGrid from "@/components/ui/ArticleGrid";
import MainLayout from "@/layouts/MainLayout";
import { getArticlesByCategorySlug } from "@/services/article.service";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ArticleCategory = () => {
  const router = useRouter();

  const [articles, setArticles] = useState();

  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (!router.query || isEmpty(router.query)) return;

    if (Object.values(router.query).includes("undefined"))
      return setIsValidPage(false);

    getArticlesByCategorySlug(router.query["category-slug"])
      .then((response) => {
        setIsValidPage(!!response);
        setArticles(response?.rows);
      })
      .catch(() => setIsValidPage(false));
  }, [router.query]);

  return (
    <>
      <SEO title={"Articles"} />

      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <ArticleGrid articles={articles} />
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
};

export default ArticleCategory;
