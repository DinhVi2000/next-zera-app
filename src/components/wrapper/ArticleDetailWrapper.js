import { Fragment, memo } from "react";

const { formatDate } = require("@/utils/helper");

import ImageLoading from "@/components/loading/ImageLoading";
import Breadcrumb from "@/components/ui/Breadcrumb";

import { DocumentRenderer } from "@keystone-6/document-renderer";

import { dynamicPaths, staticPaths } from "@/utils/$path";

const ArticleDetailWrapper = ({ article }) => {
  const {
    content,
    created_at,
    featured_image,
    title,
    seo_description,
    slug,
  } = article ?? {};

  const breadcrumbsData = [
    {
      label: "Home",
      url: staticPaths.home,
    },
    {
      label: "All Article Tags",
      url: staticPaths.all_article_tags,
    },
    {
      label: title,
      url: dynamicPaths.article_by_slug(slug),
    },
  ];

  return (
    <>
      <div className="w-responsive">
        <div className="bg-blur-800 text-white w-full border-[5px] border-pink-400 rounded-[20px] min-h-[400px] py-6 px-7">
          {article && (
            <Fragment>
              <Breadcrumb className="text-white mb-5" list={breadcrumbsData} />

              <h1 className="text-[40px] font-bold">{title}</h1>

              <p className="text-xs mb-2">{formatDate(created_at)}</p>
              <p className="mb-5">{seo_description}</p>

              <p className="text-white">
                <DocumentRenderer
                  document={JSON.parse(content)}
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                />
              </p>

              {featured_image && (
                <ImageLoading
                  src={featured_image}
                  className="w-full max-w-[500px] max-h-[500px] mx-auto my-5 object-cover"
                />
              )}
            </Fragment>
          )}

          <ArticleDetailLoading article={article} />
        </div>
      </div>
    </>
  );
};

const ArticleDetailLoading = ({ article }) => {
  return (
    <>
      {!article && (
        <>
          <h1 className="h-4 mt-12 w-[150px] rounded-2xl skeleton-shine "></h1>
          <p className="h-2 w-[200px] rounded-2xl my-2 skeleton-shine"></p>
          <p className="h-2 w-[400px] rounded-2xl skeleton-shine"></p>
        </>
      )}
    </>
  );
};

export default memo(ArticleDetailWrapper);
