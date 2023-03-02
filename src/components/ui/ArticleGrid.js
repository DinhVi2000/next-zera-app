/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/utils/helper";
import Link from "next/link";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import ImageLoading from "../loading/ImageLoading";

const ArticleGrid = () => {
  const { articleIndex } = useSelector(({ article }) => article) ?? {};
  const { articles } = articleIndex ?? {};

  return (
    <div className="w-responsive h-full">
      <div
        className="text-white min-h-[94px] w-full max-w-[424px] rounded-2xl flex items-center justify-center text-lg font-bold"
        style={{
          background:
            "linear-gradient(rgb(196, 181, 253) 0%, rgb(151, 155, 255) 0.01%, rgb(239, 54, 198) 100%)",
        }}
      >
        Articles
      </div>

      <div className="flex gap-4 my-4 flex-wrap">
        {articles?.length > 0 &&
          articles?.map((e, i) => <ArticleItem key={i} item={e} />)}
        <ArticleGridLoading articles={articles} />
      </div>
    </div>
  );
};

const ArticleItem = ({ item, ...props }) => {
  const { id, content, created_at, feature_image, title } = item ?? {};

  return (
    <Link
      href={`/article/${id}`}
      {...props}
      className="bg-violet-gradient text-white min-h-[204px] w-[534px] rounded-2xl overflow-hidden border border-pink-500 "
    >
      <div className="h-full w-full flex">
        <ImageLoading
          src={feature_image}
          alt={title}
          className="w-[204px] h-full rounded-[10px]"
        />
        <div className="py-3 px-4">
          <h2 className="text-base font-bold">{title}</h2>
          <span className="text-xs my-1 ">{formatDate(created_at)}</span>
          <p className="text-xs font-medium">{content}</p>
        </div>
      </div>
    </Link>
  );
};

const ArticleGridLoading = ({ articles }) => {
  return (
    <>
      {!articles &&
        Array(8)
          .fill(0)
          .map((e, i) => (
            <div
              key={i}
              className="min-h-[204px] w-[534px] rounded-2xl bg-white flex"
            >
              <div className="w-[204px] h-full rounded-[10px] skeleton-shine"></div>
              <div className="flex-1 py-4 px-4">
                <div className="skeleton-shine h-4 w-full rounded-2xl mb-3"></div>
                <div className="skeleton-shine h-3 w-[50%] rounded-2xl"></div>
              </div>
            </div>
          ))}
    </>
  );
};

export default ArticleGrid;
