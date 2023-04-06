import { articleCategoryUrl } from "@/utils/helper";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllArticleCategory,
  getArticlesNewest,
} from "@/services/article.service";
import { IconArrowRight } from "@/resources/icons";
import { dynamicPaths, staticPaths } from "@/utils/$path";
import ImageLoading from "../loading/ImageLoading";
import ScrollContainer from "react-indiana-drag-scroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function ListArticleCategory() {
  const dispatch = useDispatch();
  const screen1250 = useMediaQuery("(max-width: 1250px)");
  const screen880 = useMediaQuery("(max-width: 880px)");
  const screen660 = useMediaQuery("(max-width: 660px)");

  const { categories, articleNewest } =
    useSelector(({ article }) => article) ?? {};

  useEffect(() => {
    Promise.all([getAllArticleCategory(dispatch), getArticlesNewest(dispatch)]);
  }, []);

  return (
    <div className="bg-[#000000cc] px-[65px] py-[19px] mt-[50px]">
      {/* TRENDING NEWS */}
      <h3 className="text-white text-[28px] font-bold">Trending News</h3>

      <div className="overflow-x-scroll modal-scroll">
        <div className="grid grid-cols-2 gap-x-3 mb-4 max-[1200px]:w-[1000px]">
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
      {/* ARTICLE CATEGORY */}
      <h3 className="text-white text-[28px] font-bold flex items-center justify-between">
        List Article Category
        {categories?.length > 25 && (
          <Link href={staticPaths.all_article_category}>
            <div className="text-lg flex items-center group hover:text-pink-500 w-fit">
              View all
              <IconArrowRight className="group-hover:text-pink-500 w-3 h-3 ml-3" />
            </div>
          </Link>
        )}
      </h3>

      <div className="text-pink-500 text-sm pl-6">
        <ul
          className={`list-disc my-2 grid grid-rows-5 gap-x-4 ${
            screen660
              ? "grid-cols-2"
              : screen880
              ? "grid-cols-3"
              : screen1250
              ? "grid-cols-4"
              : "grid-cols-5"
          }`}
        >
          {categories?.length > 0 &&
            categories
              ?.slice(
                0,
                screen660 ? "10" : screen880 ? "15" : screen1250 ? "20" : "25"
              )
              ?.map((e, i) => (
                <li key={i} className="my-2 text-sm">
                  <Link
                    href={articleCategoryUrl(e?.slug)}
                    className="underline underline-offset-2"
                  >
                    {e?.label}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default ListArticleCategory;
