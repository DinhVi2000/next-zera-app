import PreviousRouter from "../previousRouter/PreviousRouter";

const { dynamicPaths } = require("@/utils/$path");
const { default: Link } = require("next/link");

const ArticleTagsWrapper = ({ tags }) => {
  return (
    <div className="w-responsive">
      <div className="bg-blur-800 rounded-2xl py-8 px-7 w-responsive border-[5px] border-pink-400">
        <PreviousRouter className="text-white" />

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
        </div>
      </div>
    </div>
  );
};

export default ArticleTagsWrapper;
