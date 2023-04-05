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

function ListArticleCategory() {
  const dispatch = useDispatch();
  const { categories, articleNewest } =
    useSelector(({ article }) => article) ?? {};

  useEffect(() => {
    Promise.all([getAllArticleCategory(dispatch), getArticlesNewest(dispatch)]);
  }, []);

  return (
    <div className="bg-[#000000cc] px-[65px] py-[19px] mt-[170px]">
      {/* TRENDING NEWS */}
      <h3 className="text-white text-[28px] font-bold">Trending News</h3>

      <div className="flex gap-x-3 mb-4">
        {articleNewest?.slice(0, 2)?.map((e, i) => (
          <div
            key={i}
            className="border border-[#BE185D] bg-black rounded-md text-white p-2 flex items-center w-[50%]"
          >
            <ImageLoading
              alt=""
              src={e?.featured_image}
              className="w-[194px] h-[194px] rounded-md"
            />
            <div className="p-4 w-[75%]">
              <ScrollContainer>
                <div className="flex whitespace-nowrap gap-2 mb-2">
                  {e?.article_tags?.length > 0 && (
                    <>
                      {e?.article_tags?.map((e, i) => (
                        <Link
                          href={dynamicPaths.game_by_tag(
                            e?.superslug?.value,
                            e?.slug
                          )}
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

              <div className="">
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
        ))}
      </div>

      {/* ARTICLE CATEGORY */}
      <h3 className="text-white text-[28px] font-bold">
        List Article Category
      </h3>

      <div className="text-pink-500 text-sm pl-6">
        <ul className="list-disc my-2">
          {categories?.length > 0 &&
            categories?.slice(0, 5)?.map((e, i) => (
              <li key={i} className="my-2 text-sm">
                <Link
                  href={articleCategoryUrl(e?.slug)}
                  className="underline underline-offset-2"
                >
                  {e?.label}
                </Link>
              </li>
            ))}
          {categories?.length > 5 && (
            <Link href={staticPaths.all_article_category}>
              <div className="text-lg flex items-center mt-5 ml-[-15px] group hover:text-white w-fit">
                View all
                <IconArrowRight className="text-pink-500 w-3 h-3 ml-3 group-hover:text-white" />
              </div>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ListArticleCategory;
