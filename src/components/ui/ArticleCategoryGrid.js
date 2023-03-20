import { IconBack } from "@/resources/icons";
import { staticPaths } from "@/utils/$path";
import { articleCategoryUrl } from "@/utils/helper";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import PreviousRouter from "../previousRouter/PreviousRouter";
import Breadcrumb from "./Breadcrumb";

const breadcrumbsData = [
  {
    label: "Home",
    url: staticPaths.home,
  },
  {
    label: "All Article Category",
    url: staticPaths.all_article_category,
  },
];

const ArticleCategoryGrid = () => {
  const { categories } = useSelector(({ article }) => article) ?? {};

  return (
    <div className="bg-blur-800 rounded-2xl py-8 px-7 w-responsive border-[5px] border-pink-400">
      {/* breadcrumb */}
      <Breadcrumb className="text-white mb-5" list={breadcrumbsData} />

      {/* tags */}

      {/* list */}
      <div className="text-pink-500 text-sm pl-6">
        <ul className="list-disc">
          {categories?.length > 0 &&
            categories?.map((e, i) => (
              <li key={i}>
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
};

export default ArticleCategoryGrid;
