import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ImageLoading from "../loading/ImageLoading";
import ScrollContainer from "react-indiana-drag-scroll";
import Link from "next/link";
import { dynamicPaths } from "@/utils/$path";
import { IconReadMore } from "@/resources/icons";
import { formatDate } from "@/utils/helper";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function RandomArticle() {
  const { articleRandom } = useSelector(({ article }) => article) ?? {};

  const screen720 = useMediaQuery("(max-width: 720px)");

  return (
    <Carousel
      className="w-full h-[537px] max-[720px]:h-[400px] relative"
      infiniteLoop
      swipeable
      swipeScrollTolerance
      autoPlay
      showStatus={false}
      showIndicators={!screen720 && true}
    >
      {articleRandom?.map((e, i) => (
        <div key={i} className="w-full h-full text-white">
          <div className="absolute top-0 left-0 w-full h-full select-none">
            <ImageLoading
              alt=""
              src={e?.featured_image}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div
            className={`absolute z-10 px-[26px] flex items-start flex-col gap-y-3 
            ${
              screen720
                ? "left-0 bottom-0 w-full h-full background-carousel justify-end pb-6"
                : "top-0 right-0 w-[33%] h-full rounded-r-md bg-[#000000b3] justify-center"
            }`}
          >
            <ScrollContainer className="w-full">
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
                        <div className="bg-white flex items-center text-black text-sm rounded-[20px] px-4 h-6 select-none">
                          {e?.label}
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </ScrollContainer>

            <div
              className="text-left text-[32px] font-bold line-clamp select-none"
              style={{ WebkitLineClamp: "3" }}
            >
              {e?.seo_title}
            </div>
            <div
              className="text-left text-sm font-light line-clamp select-none"
              style={{ WebkitLineClamp: "3" }}
            >
              {e?.seo_description}
            </div>
            <div className="text-left text-sm font-light select-none">
              {formatDate(e?.created_at)}
            </div>
            <Link href={`/article/${e?.slug}`}>
              <button className="bg-[#BE185D] p-2 px-3 rounded-sm flex-center mt-4">
                Read more <IconReadMore className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
export default RandomArticle;
