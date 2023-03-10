/* eslint-disable @next/next/no-img-element */
import React, { memo } from "react";

import Link from "next/link";

import { formatDate } from "@/utils/helper";

import ImageLoading from "../loading/ImageLoading";

import { DocumentRenderer } from "@keystone-6/document-renderer";
import Empty from "../empty/Empty";
import SidebarMB from "../responsive/SidebarMB";

const ArticleGrid = ({ articles }) => {
  return (
    <div className="w-responsive h-full">
      <div className="flex gap-4">
        <div
          className="text-white min-h-[94px] w-full max-[550px]:max-w-[204px] max-w-[424px] rounded-2xl flex items-center justify-center text-lg font-bold"
          style={{
            background:
              "linear-gradient(rgb(196, 181, 253) 0%, rgb(151, 155, 255) 0.01%, rgb(239, 54, 198) 100%)",
          }}
        >
          Articles
        </div>
        <SidebarMB className={"tbl-flex"} />
      </div>

      <div className="gap-4 my-4 grid grid-cols-1 min-[1211px]:grid-cols-2 min-[1870px]:grid-cols-3">
        {articles?.length > 0 &&
          articles?.map((e, i) => <ArticleItem key={i} item={e} />)}
        <ArticleGridLoading articles={articles} />
      </div>

      {/* no data */}
      {articles?.length === 0 && <Empty className={"text-white h-[500px]"} />}
    </div>
  );
};

const ArticleItem = ({ item, ...props }) => {
  const { slug, content, created_at, featured_image, title } = item ?? {};

  return (
    <Link
      href={`/article/${slug}`}
      {...props}
      className="bg-violet-gradient text-white min-h-[204px] rounded-2xl overflow-hidden border border-pink-500 "
    >
      <div className="h-full w-full flex">
        <ImageLoading
          src={featured_image}
          alt={title}
          className="min-w-[204px] max-w-[204px] h-full rounded-[10px]"
        />
        <div className="py-3 px-4 flex-1 w-[328px]">
          <h2 className="text-base font-bold">{title}</h2>
          <span className="text-xs my-1 ">{formatDate(created_at)}</span>
          <span className="text-xs font-medium ">
            {
              <DocumentRenderer
                document={JSON.parse(content)}
                className="whitespace-nowrap overflow-hidden text-ellipsis"
              />
            }
          </span>
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
              className="min-h-[204px] w-[534px] rounded-2xl flex bg-violet-gradient border border-pink-500"
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
