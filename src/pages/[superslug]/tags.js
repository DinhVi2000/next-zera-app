/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import SEO from "@/components/other/SEO";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import PreviousRouter from "@/components/previousRouter/PreviousRouter";

import { getAllGameTagBySuperslug } from "@/services/game.service";

import { useRouter } from "next/router";
import Link from "next/link";

import { dynamicPaths } from "@/utils/$path";
import { hasNoValueUndefined } from "@/utils/helper";

const CategoryTags = () => {
  const router = useRouter();

  const { query } = router;
  const [tags, setTags] = useState();
  const [isValidPage, setIsValidPage] = useState();

  useEffect(() => {
    if (hasNoValueUndefined(query))
      getAllGameTagBySuperslug(query.superslug)
        .then((res) => {
          setTags(res.rows);
          setIsValidPage(true);
        })
        .catch(() => setIsValidPage(false));
  }, [query]);

  return (
    <>
      <SEO title="Game tags" />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <GameTagsWrapper superslug={query.superslug} tags={tags} />
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
};

export default CategoryTags;

const GameTagsWrapper = memo(function GameTagsWrapperComponent({
  superslug,
  tags,
}) {
  return (
    <div className="w-responsive">
      <div className="bg-blur-800 rounded-2xl py-8 px-7 w-responsive border-[5px] border-pink-400">
        <PreviousRouter className="text-white" />

        <h1 className="text-white text-[40px] font-bold mb-5">All Game Tags</h1>

        <div className="flex flex-wrap gap-3">
          {tags?.map((e, i) => (
            <Link href={dynamicPaths.game_by_tag(superslug, e?.slug)} key={i}>
              <div className="py-2 px-5 rounded-[20px] bg-white text-xs font-bold uppercase">
                {e?.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});
