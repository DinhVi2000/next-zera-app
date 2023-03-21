/* eslint-disable @next/next/no-img-element */
import React from "react";

import Link from "next/link";

import { formatDate } from "@/utils/helper";

import ImageLoading from "../loading/ImageLoading";

import { DocumentRenderer } from "@keystone-6/document-renderer";
import Empty from "../empty/Empty";
import SidebarMB from "../responsive/SidebarMB";
import PaginatedItems from "../pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";

const ITEMS_PER_PAGE = 4;

const ArticleGrid = ({ articleInfo, articles }) => {
  const { currentItems, handlePageClick } = usePagination(
    ITEMS_PER_PAGE,
    articles
  );

  return (
    <div className="w-responsive h-full">
      {/* title */}
      <div className="flex gap-4">
        <SidebarMB className={"tbl-flex left-0"} />
        <div
          className="max-[990px]:ml-[94px] text-white overflow-hidden text-ellipsis min-h-[94px] max-h-[94px] w-full max-[550px]:max-w-[204px] max-w-[424px] rounded-2xl flex items-center justify-center text-lg font-bold px-6 py-3"
          style={{
            background:
              "linear-gradient(rgb(196, 181, 253) 0%, rgb(151, 155, 255) 0.01%, rgb(239, 54, 198) 100%)",
          }}
        >
          {articleInfo?.label}
        </div>
      </div>

      {articles?.length > 0 && (
        <>
          {/* list */}
          <div className="min-h-[424px] gap-4 my-4 grid grid-cols-1 min-[1211px]:grid-cols-2 min-[1870px]:grid-cols-3">
            {currentItems?.length > 0 &&
              currentItems?.map((e, i) => <ArticleItem key={i} item={e} />)}
            <ArticleGridLoading articles={articles} />
          </div>

          {/* pagination */}
          <PaginatedItems
            className="text-white"
            items={articles}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageClick}
          />
        </>
      )}

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
      className="bg-violet-gradient text-white min-h-[204px] max-h-[204px] rounded-2xl overflow-hidden border border-pink-500 "
    >
      <div className="h-full w-full flex">
        <ImageLoading
          src={featured_image}
          alt={title}
          className="min-w-[204px] max-w-[204px] h-full rounded-[10px] object-cover"
        />
        <div className="py-3 px-4 flex-1 w-[328px] flex flex-col h-full justify-between">
          <div>
            <h2 className="text-base font-bold">{title}</h2>

            {/* tags */}
            {/* <div className="flex gap-[5px]">
              <div className="bg-white text-black text-sm my-1 px-2.5 font-semibold rounded-[20px]">
                tag
              </div>
            </div> */}

            <span className="text-xs font-medium ">
              {
                <DocumentRenderer
                  document={JSON.parse(content)}
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                />
              }
            </span>
          </div>
          <span className="text-xs mt-1 self-end italic">
            {formatDate(created_at)}
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
