/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import { useApi } from "@/hooks/useApi";

import SEO from "@/components/other/SEO";
import ArticleTagsWrapper from "@/components/wrapper/ArticleTagsWrapper";
import { apiURL } from "@/utils/$apiUrl";

const ArticleTags = () => {
  const { get } = useApi();

  const [tags, setTags] = useState();

  useEffect(() => {
    get(apiURL.get.all_article_tag).then((data) => {
      setTags(data);
    });
  }, []);

  return (
    <>
      <SEO title="Game tags" />

      <MainLayout>
        <ArticleTagsWrapper tags={tags} />
      </MainLayout>
    </>
  );
};

export default ArticleTags;
