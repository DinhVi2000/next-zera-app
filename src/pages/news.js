import React, { useState, useEffect } from "react";
import ImageLoading from "@/components/loading/ImageLoading";
import SEO from "@/components/other/SEO";
import { useApi } from "@/hooks/useApi";
import MainLayout from "@/layouts/MainLayout";
import { IconTtlNews } from "@/resources/icons";
import {
  getAllArticleCategory,
  getArticlesByTagSlug,
  getArticlesNewest,
  getArticlesRandom,
} from "@/services/article.service";
import { apiURL } from "@/utils/$apiUrl";
import { dynamicPaths } from "@/utils/$path";
import { formatDate, notifyErrorMessage } from "@/utils/helper";
import Link from "next/link";

import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";
import RandomArticle from "@/components/news/RandomArticle";
import HandleNotFoundPage from "@/components/other/HandleNotFoundPage";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import SidebarMB from "@/components/responsive/SidebarMB";

function News() {
  const [isValidPage, setIsValidPage] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const getDataNews = async () => {
    await Promise.all([
      getAllArticleCategory(dispatch),
      getArticlesNewest(dispatch),
      getArticlesRandom(dispatch),
    ]).then((data) => {
      setIsValidPage(true);
    });
  };

  useEffect(() => {
    getDataNews();
  }, []);

  return (
    <>
      <SEO title={"News"} />
      <HandleNotFoundPage isValidPage={isValidPage}>
        <MainLayout>
          <div className="w-responsive">
            <SidebarMB
              className={"tbl-flex"}
              childClassName={"static-important mb-5"}
            />
            <RandomArticle />
            <Trending />
            <Popular />
            <MainContent />
          </div>
        </MainLayout>
      </HandleNotFoundPage>
    </>
  );
}

const Trending = () => {
  const { articleNewest } = useSelector(({ article }) => article) ?? {};

  return (
    <div className="my-10">
      <h3 className="text-white text-[28px] font-bold">Trending News</h3>

      <div className="overflow-x-scroll modal-scroll">
        <div className="grid grid-cols-2 gap-x-3 mb-4 max-[720px]:w-[700px]">
          {articleNewest?.slice(0, 2)?.map((e, i) => (
            <Link href={`/article/${e?.slug}`} key={i}>
              <div className="border border-[#BE185D] bg-black rounded-md text-white p-2 grid grid-cols-3 grid-rows-1">
                <ImageLoading
                  alt=""
                  src={e?.featured_image}
                  className="w-[194px] h-[194px] object-cover rounded-md min-[1871px]:w-full"
                />

                <div className="p-4 col-span-2 row-span-2">
                  <ScrollContainer>
                    <div className="flex whitespace-nowrap gap-2 mb-2">
                      {e?.article_tags?.length > 0 && (
                        <>
                          {e?.article_tags?.map((e, i) => (
                            <Link
                              href={dynamicPaths.article_by_tag(e?.slug)}
                              key={i}
                            >
                              <div className="bg-white flex items-center text-black text-sm rounded-[20px] px-4 h-6">
                                {e?.label}
                              </div>
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  </ScrollContainer>

                  <div>
                    <p
                      className="text-2xl font-bold line-clamp"
                      style={{ WebkitLineClamp: "2" }}
                    >
                      {e?.seo_title}
                    </p>
                    <p
                      className="text-sm break-words line-clamp"
                      style={{ WebkitLineClamp: "3" }}
                    >
                      {e?.seo_description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const Popular = () => {
  const { articleNewest } = useSelector(({ article }) => article) ?? {};

  return (
    <>
      <div className="text-white text-[28px] font-bold">Popular News</div>
      <div className="max-[880px]:hidden grid grid-cols-3 grid-rows-1 gap-x-2 h-[424px]">
        {articleNewest?.length > 0 && (
          <div className="col-span-2 row-span-2 relative rounded-md">
            <Link
              href={`/article/${articleNewest[0]?.slug}`}
              className="h-full block"
            >
              <ImageLoading
                alt=""
                src={articleNewest[0]?.featured_image}
                className="absolute w-full h-full object-cover rounded-md"
              />
              <div className="p-4 rounded-md absolute z-10 bg-gradient-to-t from-[#000000dc] from-10% to-[#0000001f] w-full h-full text-white flex flex-col justify-end">
                <ScrollContainer>
                  <div className="flex whitespace-nowrap gap-2 mb-2">
                    {articleNewest[0].article_tags?.length > 0 && (
                      <>
                        {articleNewest[0].article_tags?.map((e, i) => (
                          <Link
                            href={dynamicPaths.article_by_tag(e?.slug)}
                            key={i}
                          >
                            <div className="bg-white flex items-center text-black text-sm rounded-[20px] px-4 h-6">
                              {e?.label}
                            </div>
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </ScrollContainer>

                <div className="text-3xl font-bold whitespace-nowrap text-ellipsis overflow-hidden w-full">
                  {articleNewest[0]?.seo_title}
                </div>
                <div
                  className="line-clamp text-sm font-light"
                  style={{ WebkitLineClamp: "2" }}
                >
                  {articleNewest[0]?.seo_description}
                </div>
                <div>{formatDate(articleNewest[0]?.created_at)}</div>
              </div>
            </Link>
          </div>
        )}

        {articleNewest?.length > 0 && (
          <div className="border border-[#BE185D] bg-black rounded-md text-white p-2">
            <Link
              href={`/article/${articleNewest[1]?.slug}`}
              className="h-full block"
            >
              <ImageLoading
                alt=""
                src={articleNewest[1]?.featured_image}
                className="w-full h-[244px] rounded-md mx-auto object-cover"
              />
              <ScrollContainer>
                <div className="flex whitespace-nowrap gap-2 mb-2 my-2 w-full">
                  {articleNewest[1].article_tags?.length > 0 && (
                    <>
                      {articleNewest[1].article_tags?.map((e, i) => (
                        <Link
                          href={dynamicPaths.article_by_tag(e?.slug)}
                          key={i}
                        >
                          <div className="bg-white flex items-center text-black text-sm rounded-[20px] px-4 h-6">
                            {e?.label}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </ScrollContainer>

              <div
                className="line-clamp text-2xl font-bold"
                style={{ WebkitLineClamp: "2" }}
              >
                {articleNewest[1]?.seo_title}
              </div>
              <div
                className="line-clamp text-xs font-light"
                style={{ WebkitLineClamp: "3" }}
              >
                {articleNewest[1]?.seo_description}
              </div>
            </Link>
          </div>
        )}
      </div>

      <div className="min-[881px]:hidden flex overflow-x-scroll modal-scroll gap-x-4">
        {articleNewest?.length > 0 && (
          <>
            {articleNewest?.map((e, i) => (
              <div
                className="border border-[#BE185D] bg-black rounded-md text-white p-2 w-[314px] h-[424px]"
                key={i}
              >
                <Link
                  href={`/article/${articleNewest[1]?.slug}`}
                  className="h-full block"
                >
                  <ImageLoading
                    alt=""
                    src={articleNewest[1]?.featured_image}
                    className="w-full h-[244px] rounded-md mx-auto object-cover"
                  />
                  <ScrollContainer>
                    <div className="flex whitespace-nowrap gap-2 mb-2 my-2 w-full">
                      {articleNewest[1].article_tags?.length > 0 && (
                        <>
                          {articleNewest[1].article_tags?.map((e, i) => (
                            <Link
                              href={dynamicPaths.article_by_tag(e?.slug)}
                              key={i}
                            >
                              <div className="bg-white flex items-center text-black text-sm rounded-[20px] px-4 h-6">
                                {e?.label}
                              </div>
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  </ScrollContainer>

                  <div
                    className="line-clamp text-2xl font-bold"
                    style={{ WebkitLineClamp: "2" }}
                  >
                    {articleNewest[1]?.seo_title}
                  </div>
                  <div
                    className="line-clamp text-xs font-light"
                    style={{ WebkitLineClamp: "3" }}
                  >
                    {articleNewest[1]?.seo_description}
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

const MainContent = () => {
  const toast = useToast();
  const { get } = useApi();
  const [tags, setTags] = useState([]);
  const [slug, setSlug] = useState();
  const [items, setItems] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => setSlug(data?.tags);
  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  useEffect(() => {
    get(apiURL.get.all_article_tag).then((data) => {
      setTags(data);
    });
  }, []);

  const handleArticleByTag = async () => {
    try {
      const data = await getArticlesByTagSlug(slug);
      setItems(data?.allArticleByTags);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    if (slug) {
      handleArticleByTag(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (tags) {
      setIsSelected(tags[0]?.id);
      setSlug(tags[0]?.slug);
      getArticlesByTagSlug(slug);
    }
  }, [tags]);

  return (
    <>
      <div className="flex items-center mt-12 max-[881px]:flex-col">
        <IconTtlNews />

        <div className="max-[551px]:hidden flex items-center gap-x-3 ml-8 max-[1211px]:gap-x-2 max-[881px]:gap-x-1 max-[881px]:ml-0 max-[881px]:mt-3">
          {tags?.length > 0 &&
            tags?.slice(0, 5)?.map((e, i) => (
              <div
                key={i}
                className={`box-border cursor-pointer rounded-sm py-2 px-4 text-white text-xl max-[1321px]:text-base max-[1211px]:text-sm max-[881px]:px-1 max-[1321px]:px-2 font-normal border-[2px] border-[#be185d00] hover:border-[#BE185D] ${
                  isSelected === e?.id ? "bg-[#BE185D]" : ""
                }`}
                onClick={() => {
                  setSlug(e?.slug);
                  setIsSelected(e?.id);
                }}
              >
                {e?.label}
              </div>
            ))}
        </div>

        <div className="max-[551px]:flex hidden text-white items-center justify-center mt-5">
          Category :
          <form onSubmit={handleSubmit(onSubmit)} className="ml-5">
            <select
              {...register("tags")}
              className="bg-[#BE185D] p-3 rounded-md text-white focus-visible:outline-none"
            >
              {tags?.length > 0 &&
                tags?.slice(0, 5)?.map((e, i) => (
                  <option
                    key={i}
                    className={`box-border cursor-pointer rounded-sm py-2 px-4 text-white text-xl max-[1321px]:text-base max-[1211px]:text-sm max-[881px]:px-1 max-[1321px]:px-2 font-normal border-[2px] border-[#be185d00] hover:border-[#BE185D] ${
                      isSelected === e?.id ? "bg-[#BE185D]" : ""
                    }`}
                    value={e?.slug}
                    onClick={() => {
                      setSlug(e?.slug);
                      setIsSelected(e?.id);
                    }}
                  >
                    {e?.label}
                  </option>
                ))}
            </select>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 min-[551px]:grid-cols-2 min-[881px]:grid-cols-3 min-[1541px]:grid-cols-5 min-[1870px]:grid-cols-6 grid-rows-1 gap-4 mt-5">
        {items?.map((e, i) => (
          <Link key={i} href={`/article/${e?.slug}`} className="block h-full">
            <div className="border border-[#BE185D] bg-black rounded-md text-white p-2 col-span-1 row-span-1 ">
              <ImageLoading
                alt=""
                src={e?.featured_image}
                className="w-full h-[244px] rounded-md mx-auto object-cover"
              />
              <ScrollContainer>
                <div className="flex whitespace-nowrap gap-2 mb-2 my-2 w-full">
                  {e.article_tags?.length > 0 && (
                    <>
                      {e.article_tags?.map((e, i) => (
                        <Link
                          href={dynamicPaths.article_by_tag(e?.slug)}
                          key={i}
                        >
                          <div className="bg-white flex items-center text-black text-sm rounded-[20px] px-4 h-6">
                            {e?.label}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </ScrollContainer>

              <div
                className="line-clamp text-2xl font-bold"
                style={{ WebkitLineClamp: "2" }}
              >
                {e?.seo_title}
              </div>
              <div
                className="line-clamp text-xs font-light"
                style={{ WebkitLineClamp: "3" }}
              >
                {e?.seo_description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default News;
