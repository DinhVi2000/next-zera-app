import React, { useEffect, useState } from "react";

import MainLayout from "@/layouts/MainLayout";

import { useToast, RadioGroup, Radio } from "@chakra-ui/react";

import { SHOP_TAB, STATUS } from "@/utils/constant";

import AvatarItem from "@/components/shop/AvatarItem";
import CoverPageItem from "@/components/shop/CoverPageItem";
import PlayTimeItem from "@/components/shop/PlayTimeItem";

import { useModalContext } from "@/context/modal-context";

import { IconArrowLeft } from "@/resources/icons";

import { getCategoriesShop, getItemByCategory } from "@/services/shop.service";

import { notifyErrorMessage } from "@/utils/helper";
import { useSocketContext } from "@/context/socket-context";
import SEO from "@/components/other/SEO";
import Zera from "@/components/zera/Zera";
import SidebarMB from "@/components/responsive/SidebarMB";
import { useRouter } from "next/router";
import Pagination from "@/components/pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";
import Empty from "@/components/empty/Empty";

const Shop = () => {
  const router = useRouter();
  const { status, setStatus } = useModalContext();
  const { setSocketStatus } = useSocketContext();
  const toast = useToast();

  const [idCategory, setIdCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(SHOP_TAB.AVATAR);
  const [categories, setCategories] = useState([]);
  const [itemsShop, setItemsShop] = useState();
  const [itemsSort, setItemsSort] = useState();
  const [sortShop, setSortShop] = useState("all");

  const displayItems = tab !== SHOP_TAB.COVER_PAGE ? 8 : 4;
  const checkItems = sortShop !== "all" ? itemsSort : itemsShop;
  const { currentItems, handlePageClick } = usePagination(
    displayItems,
    checkItems,
    sortShop
  );

  const getItem = async (idCategory) => {
    try {
      setIsLoading(false);
      const { data } = await getItemByCategory(idCategory);
      if (!data) return;
      setItemsShop(data?.rows);
      setStatus(STATUS.NOT_START);
      setSocketStatus(STATUS.NOT_START);
      setIsLoading(true);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  const getTabShop = async () => {
    const { data } = await getCategoriesShop();
    setCategories(data);
  };

  useEffect(() => {
    getTabShop();
  }, []);

  useEffect(() => {
    if (!idCategory) return;
    // TODO: Only let the effect call fn once when mound, the rest only setState when status === success, limit rerender call api many times
    //  vd: (status === STATUS.SUCCESS || status === STATUS.INIT) && getItem(idCategory);
    getItem(idCategory);
  }, [status, idCategory]);

  useEffect(() => {
    if (categories) {
      setIdCategory(categories[0]?.id);
    }
  }, [categories]);

  const itemsOwned = itemsShop?.filter((e) => e?.user_inventory);
  const itemsBuy = itemsShop?.filter((e) => !e?.user_inventory);

  useEffect(() => {
    if (sortShop === "owned") {
      setItemsSort(itemsOwned);
    } else if (sortShop === "buy") {
      setItemsSort(itemsBuy);
    }
  }, [sortShop]);

  useEffect(() => {
    setSortShop("all");
  }, [tab]);

  return (
    <>
      <SEO title={"Shop"} />
      <MainLayout>
        {/* content  */}
        <div className="min-[1352px]:min-w-[1100px] max-[990.9px]:max-w-[900px] max-[990.9px]:w-full">
          <div className="text-white min-[990.9px]:bg-blur-800 min-[990.9px]:border-[5px] min-[990.9px]:border-violet-400 max-[1320px]:px-[30px] max-[990.9px]:p-0 p-[62px] pt-2.5 rounded-[20px] relative">
            <button
              className="absolute z-50 left-5 top-[10px] flex items-center justify-self-start max-[990.9px]:top-[160px] max-[550px]:top-[230px]"
              onClick={() => router.back()}
            >
              <IconArrowLeft />
              <span className="ml-2 text-[#EC4899] text-lg font-semibold">
                Back
              </span>
            </button>
            {/* title */}
            <div className="flex-center mb-[58px]">
              <SidebarMB
                className={"tbl-flex"}
                childClassName={"static-important"}
              />
              <div className="bg-pink-800 rounded-[20px] mx-auto py-2.5 text-[40px] text-center font-bold w-[280px] max-[990.9px]:h-[94px] flex-center max-[400px]:w-[170px] max-[400px]:text-2xl">
                Simple Shop
              </div>
            </div>

            {/* tab */}
            <div className="flex gap-3 max-[600px]:gap-0 justify-center relative">
              {categories
                ?.sort((a, b) => (a?.id < b?.id ? -1 : 1))
                ?.map((category, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setTab(category?.name);
                      setIdCategory(category?.id);
                    }}
                    className={`${
                      category?.name === tab
                        ? "bg-pink-800 text-white border border-pink-500"
                        : "bg-violet-900 text-[#ffffffb3] border border-violet-500"
                    } text-center text-base font-bold rounded-t-[20px] w-[120px] border-b-0 py-2.5 max-[450px]:w-[100px] max-[400px]:px-2 max-[400px]:w-fit cursor-pointer max-[400px]:text-sm`}
                  >
                    {category?.name}
                  </div>
                ))}

              <div className="absolute z-50 right-0 top-[-13px] max-[990.9px]:top-[70px] max-[990.9px]:right-[30px] max-[550px]:top-[130px]">
                <Zera />
              </div>
            </div>

            {/* content */}
            <div className="pt-[18px] px-[54px] pb-[26px] border-[5px] border-pink-500 bg-[#5b21b666] max-[550px]:bg-[#1c0147c4] rounded-[30px] max-[400px]:rounded-[20px] min-h-[400px] max-[1140px]:px-5 max-[990.9px]:pt-[30px]">
              {/* checkbox */}
              {tab !== SHOP_TAB.PLAYTIMES && (
                <div className="flex gap-4 justify-end max-[990.9px]:justify-start max-[550px]:justify-end mb-[26px] max-[550px]:mb-[100px]">
                  <RadioGroup
                    onChange={setSortShop}
                    value={sortShop}
                    className="flex-center gap-x-3 text-lg"
                  >
                    <Radio colorScheme="pink" value="all" defaultChecked>
                      All
                    </Radio>
                    <Radio colorScheme="pink" value="buy">
                      Buy
                    </Radio>
                    <Radio colorScheme="pink" value="owned">
                      Owned
                    </Radio>
                  </RadioGroup>
                </div>
              )}

              {/* list item  */}
              {currentItems?.length > 0 ? (
                <>
                  {tab === SHOP_TAB.AVATAR ? (
                    <>
                      {isLoading ? (
                        <>
                          <div className="grid grid-cols-4 justify-center gap-4 max-[1220px]:grid-cols-3 max-[750px]:grid-cols-2 max-[550px]:grid-cols-1 max-[750px]:w-[92%] mx-auto max-[784px]:w-full">
                            {currentItems?.map((e, i) => (
                              <AvatarItem tab={tab} item={e} key={i} />
                            ))}
                          </div>
                          <Pagination
                            onPageChange={handlePageClick}
                            itemsPerPage={8}
                            items={checkItems}
                          />
                        </>
                      ) : (
                        <div className="grid grid-cols-4 justify-center gap-4 max-[1220px]:grid-cols-3 max-[750px]:grid-cols-2 max-[550px]:grid-cols-1 max-[750px]:w-[92%] mx-auto max-[784px]:w-full">
                          {Array(8)
                            .fill(0)
                            .map((e, i) => (
                              <div
                                className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5 h-[286px] flex flex-col justify-between"
                                key={i}
                              >
                                <div className="skeleton-shine w-full h-[204px] rounded-[20px] max-[990.9px]:w-full mx-auto"></div>
                                <div className="skeleton-shine w-[80%] h-[24px] rounded-[7px] max-[990.9px]:w-[60%]"></div>
                                <div className="skeleton-shine w-[50%] h-[24px] rounded-[7px] max-[990.9px]:w-[40%]"></div>
                              </div>
                            ))}
                        </div>
                      )}
                    </>
                  ) : tab === SHOP_TAB.COVER_PAGE ? (
                    <>
                      {isLoading ? (
                        <>
                          <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                            {currentItems?.map((e, i) => (
                              <CoverPageItem tab={tab} item={e} key={i} />
                            ))}
                          </div>
                          <Pagination
                            onPageChange={handlePageClick}
                            itemsPerPage={4}
                            items={checkItems}
                          />
                        </>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                          {Array(4)
                            .fill(0)
                            .map((e, i) => (
                              <div
                                className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5 h-[286px] flex flex-col justify-between w-full max-[700px]:w-full"
                                key={i}
                              >
                                <div className="skeleton-shine w-[314px] h-[204px] rounded-[20px] max-[990.9px]:w-full mx-auto"></div>
                                <div className="skeleton-shine w-[80%] h-[24px] rounded-[7px] max-[990.9px]:w-[60%]"></div>
                                <div className="skeleton-shine w-[50%] h-[24px] rounded-[7px] max-[990.9px]:w-[40%]"></div>
                              </div>
                            ))}
                        </div>
                      )}
                    </>
                  ) : tab === SHOP_TAB.PLAYTIMES ? (
                    <>
                      {isLoading ? (
                        <>
                          <div className="grid grid-cols-4 justify-center gap-4 max-[1220px]:grid-cols-3 max-[750px]:grid-cols-2 max-[550px]:grid-cols-1 max-[750px]:w-[92%] mx-auto max-[784px]:w-full">
                            {currentItems?.map((e, i) => (
                              <PlayTimeItem tab={tab} item={e} key={i} />
                            ))}
                          </div>
                          <Pagination
                            onPageChange={handlePageClick}
                            itemsPerPage={8}
                            items={checkItems}
                          />
                        </>
                      ) : (
                        <div className="grid grid-cols-4 justify-center gap-4 max-[1220px]:grid-cols-3 max-[750px]:grid-cols-2 max-[550px]:grid-cols-1 max-[750px]:w-[92%] mx-auto max-[784px]:w-full">
                          {Array(6)
                            .fill(0)
                            .map((e, i) => (
                              <div
                                className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5 h-[286px] flex flex-col justify-between"
                                key={i}
                              >
                                <div className="skeleton-shine w-full h-[204px] rounded-[20px] max-[990.9px]:w-full mx-auto"></div>
                                <div className="skeleton-shine w-[80%] h-[24px] rounded-[7px] max-[990.9px]:w-[60%]"></div>
                                <div className="skeleton-shine w-[50%] h-[24px] rounded-[7px] max-[990.9px]:w-[40%]"></div>
                              </div>
                            ))}
                        </div>
                      )}
                    </>
                  ) : null}
                </>
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      </MainLayout>
      ;
    </>
  );
};

export default Shop;
