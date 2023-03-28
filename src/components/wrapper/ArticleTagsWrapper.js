import Breadcrumb from "../ui/Breadcrumb";

import { dynamicPaths, staticPaths } from "@/utils/$path";

import Link from "next/link";

import { getRandom } from "@/utils/helper";
import TagLoading from "../loading/TagLoading";

const ArticleTagsWrapper = ({ tags }) => {
  const breadcrumbsData = [
    {
      label: "Home",
      url: staticPaths.home,
    },
    {
      label: "All Article Tags",
      url: staticPaths.all_article_tags,
    },
  ];

  return (
    <div className="w-responsive">
      <div className="bg-blur-800 rounded-2xl py-8 px-7 w-responsive border-[5px] border-pink-400">
        <Breadcrumb className="text-white mb-5" list={breadcrumbsData} />

        <h1 className="text-white text-[40px] font-bold mb-5">
          All Article Tags
        </h1>

        <div className="flex flex-wrap gap-3">
          {tags?.length > 0 &&
            tags?.map((e, i) => (
              <Link href={dynamicPaths.article_by_tag(e?.slug)} key={i}>
                <div className="py-2 px-5 rounded-[20px] bg-white text-xs font-bold uppercase">
                  {e?.label}
                </div>
              </Link>
            ))}

          <TagLoading list={tags} />
        </div>
      </div>
    </div>
  );
};

export default ArticleTagsWrapper;
