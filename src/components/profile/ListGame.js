/* eslint-disable indent */
import { usePagination } from "@/hooks/usePagination";
import { IconCoin22, IconPre } from "@/resources/icons";
import { getBetweenTwoDate, toUpperCaseFirstLetter } from "@/utils/helper";
import { useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Empty from "../empty/Empty";
import GameItem from "../game/GameItem";
import ImageLoading from "../loading/ImageLoading";
import Pagination from "../pagination/Pagination";

function ListGame({ setIsOpenTab, infoList }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const { payload, listGame } = infoList;

  const matchesAvatar = useMediaQuery("(max-width: 1140px)");
  const matchesAvatarThan730 = useMediaQuery("(max-width: 730px)");
  const matchesCoverThan1500 = useMediaQuery("(max-width: 1500px)");
  const matchesCoverThan1200 = useMediaQuery("(max-width: 1200px)");
  const matchesCoverThan992 = useMediaQuery("(max-width: 992px)");

  const paginationAvatar = usePagination(
    matchesAvatarThan730[0]
      ? 4
      : matchesCoverThan992[0]
      ? 6
      : matchesAvatar[0]
      ? 9
      : 8,
    listGame?.avatar
  );
  const paginationCover = usePagination(
    matchesCoverThan992[0]
      ? 4
      : matchesCoverThan1200[0]
      ? 8
      : matchesCoverThan1500[0]
      ? 9
      : 8,
    listGame?.cover
  );

  return (
    <div className="bg-[#00000080] rounded-[20px]">
      <>
        {/* TITLE */}
        <div className="rounded-t-[20px] bg-[#EC4899] py-[16px] pl-[16px] text-[28px] font-bold relative max-[730px]:w-full max-[500px]:flex max-[500px]:justify-between">
          <div
            className="flex items-center text-2xl cursor-pointer"
            onClick={() => {
              setIsOpenTab(false);
            }}
          >
            <IconPre className="mr-1" />
            Back
          </div>
          <div className="absolute top-[50%] left-[50%] min-[500px]:translate-x-[-50%] min-[500px]:translate-y-[-50%] max-[500px]:static max-[500px]:pr-[16px]">
            {toUpperCaseFirstLetter(payload)?.replace("_", " ")}
          </div>
        </div>

        {/* BODY */}
        {payload === "PURCHASE_HISTORY" ? (
          <div className="px-[45px] py-5 max-[1718px]:px-[20px] max-[730px]:w-full max-[730px]:px-[15px]">
            <>
              {listGame?.avatar?.length > 0 && (
                <div className="flex flex-col">
                  <span className="font-bold text-3xl mb-3 max-[992px]:text-center">
                    Avatars
                  </span>
                  <div className="grid grid-cols-4 max-[1140px]:grid-cols-3 max-[730px]:grid-cols-2 max-[493px]:grid-cols-1 gap-x-9 max-[1718px]:gap-x-2">
                    {paginationAvatar?.currentItems?.map((e, i) => (
                      <div
                        className="flex items-center justify-start mx-auto"
                        key={i}
                      >
                        <ImageLoading
                          className="w-[94px] h-[94px] object-cover rounded-[20px] mb-[25px]"
                          src={e?.item_info?.url}
                        />
                        <div className="p-2 px-4">
                          <div className="font-semibold text-xl flex">
                            {e?.item_info?.price} <IconCoin22 />
                          </div>
                          <div>{getBetweenTwoDate(e?.created_at)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Pagination
                    onPageChange={paginationAvatar?.handlePageClick}
                    itemsPerPage={matchesAvatar[0] ? 9 : 8}
                    items={listGame?.avatar}
                  />
                </div>
              )}
            </>

            <>
              {listGame?.cover?.length > 0 && (
                <div className="flex flex-col">
                  <span className="font-bold text-3xl mb-3 mt-6 max-[992px]:text-center">
                    Cover pages
                  </span>
                  <div className="grid grid-cols-4 max-[1500px]:grid-cols-3 max-[1200px]:grid-cols-2 gap-x-9 max-[1718px]:gap-x-2 max-[676px]:grid-cols-1">
                    {paginationCover?.currentItems?.map((e, i) => (
                      <div
                        className="flex items-center justify-center max-[768px]:justify-start mx-auto"
                        key={i}
                      >
                        <ImageLoading
                          className="w-[204px] h-[94px] object-cover rounded-[20px] mb-[25px]"
                          src={e?.item_info?.url}
                        />
                        <div className="p-2 px-4 max-[1718px]:px-2">
                          <div className="font-semibold text-xl flex">
                            {e?.item_info?.price}{" "}
                            <IconCoin22 className="ml-2" />
                          </div>
                          <div>
                            {getBetweenTwoDate(e?.created_at)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Pagination
                    onPageChange={paginationCover?.handlePageClick}
                    itemsPerPage={
                      matchesCoverThan1200[0]
                        ? 8
                        : matchesCoverThan1500[0]
                        ? 9
                        : 8
                    }
                    items={listGame?.cover}
                  />
                </div>
              )}
            </>
          </div>
        ) : (
          <div>
            {listGame?.length ? (
              <div className="p-[45px] max-[730px]:p-2 grid grid-cols-10 max-[1294px]:grid-cols-9 max-[1194px]:grid-cols-8 max-[1102px]:grid-cols-7 max-[795px]:grid-cols-5 max-[591px]:grid-cols-4 max-[459px]:grid-cols-2 max-[459px]:px-1  gap-4 overflow-auto max-h-[500px] modal-scroll">
                {listGame?.map((e, i) => (
                  <div key={i}>
                    <GameItem
                      className={`relative rounded-2xl cursor-pointer select-none group w-[94px] h-[94px]
                        hover:translate-y-[-2px] hover:scale-105 transition-all hover:shadow-xl mx-auto`}
                      key={e?.id}
                      id={e?.id}
                      index={i}
                      thumbnail={e?.thumbnail}
                      title={e?.title}
                      slug={e?.slug}
                      superslug={e?.superslug}
                    ></GameItem>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-[200px]">
                <Empty />
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
}

export default ListGame;
