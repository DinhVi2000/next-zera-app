import { articleCategoryUrl } from "@/utils/helper";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const ArticleCategoryGrid = () => {
  const { categories } = useSelector(({ article }) => article) ?? {};

  return (
    <div className="bg-blur-800 rounded-2xl mt-[110px] py-8 px-7">
      <h2 className="text-white text-[28px] font-bold">
        List Article category
      </h2>
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
