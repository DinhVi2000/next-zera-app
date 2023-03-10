import React, { useEffect, useState } from "react";

import Head from "next/head";

import MainLayout from "@/layouts/MainLayout";

import { Checkbox, useToast } from "@chakra-ui/react";

import { SHOP_TAB, STATUS } from "@/utils/constant";

import AvatarItem from "@/components/shop/AvatarItem";
import CoverPageItem from "@/components/shop/CoverPageItem";
import Empty from "@/components/empty/Empty";
import PlayTimeItem from "@/components/shop/PlayTimeItem";

import { useAuthContext } from "@/context/auth-context";
import { useModalContext } from "@/context/modal-context";

import { IconCoin, IconPlus } from "@/resources/icons";

import { getCategoriesShop, getItemByCategory } from "@/services/shop.service";

import { notifyErrorMessage } from "@/utils/helper";
import { useSocketContext } from "@/context/socket-context";
import SEO from "@/components/other/SEO";

const Shop = () => {
  const { status, setStatus } = useModalContext();
  const { socketStatus, setSocketStatus } = useSocketContext();
  const { userInfo } = useAuthContext();
  const { zera } = userInfo || {};
  const toast = useToast();

  const [idCategory, setIdCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(SHOP_TAB.AVATAR);
  const [categories, setCategories] = useState([]);
  const [itemsShop, setItemsShop] = useState();

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

  return (
    <>
      <SEO title={"Shop"} />
      <MainLayout>
        {/* content  */}
        <div className="w-[1000px]">
          <div className="text-white bg-blur-800 border-[5px] border-violet-400 p-[62px] pt-2.5 rounded-[20px]">
            {/* title */}
            <div className="bg-pink-800 rounded-[20px] mx-auto py-2.5 text-[40px] text-center font-bold w-[280px] mb-[58px]">
              Simple Shop
            </div>

            {/* tab */}
            <div className="flex gap-3 justify-center relative">
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
                    } text-center text-base font-bold rounded-t-[20px] w-[120px]  border-b-0 py-2.5 cursor-pointer`}
                  >
                    {category?.name}
                  </div>
                ))}

              <div className="absolute z-50 right-0 top-[-13px] h-fit w-fit px-[10px] py-[3px] flex-center bg-[#4C1D95] rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer">
                <p className=" font-black text-[24px] mr-[5px]">{zera}</p>
                <IconCoin className="mr-[5px] w-9 h-9" />
                <IconPlus className="w-8 h-8" />
              </div>
            </div>

            {/* content */}
            <div className="pt-[18px] px-[54px] pb-[26px] border-[5px] border-pink-500 bg-[#5b21b666] rounded-[30px] min-h-[400px]">
              {/* checkbox */}
              <div className="flex gap-4 justify-end mb-[26px]">
                <Checkbox colorScheme="pink" defaultChecked>
                  All
                </Checkbox>
                <Checkbox colorScheme="pink" defaultChecked>
                  Buy
                </Checkbox>
                <Checkbox colorScheme="pink" defaultChecked>
                  Owned
                </Checkbox>
              </div>

              {/* list item  */}

              <>
                {tab === SHOP_TAB.AVATAR ? (
                  <>
                    {isLoading ? (
                      <div
                        className="grid grid-cols-1 justify-center
                  min-[990px]:grid-cols-2 min-[1248px]:grid-cols-3 min-[1540px]:grid-cols-4 gap-4"
                      >
                        {itemsShop?.map((e, i) => (
                          <AvatarItem tab={tab} item={e} key={i} />
                        ))}
                      </div>
                    ) : (
                      <div
                        className="grid grid-cols-1 justify-center
                  min-[990px]:grid-cols-2 min-[1248px]:grid-cols-3 min-[1540px]:grid-cols-4 gap-4"
                      >
                        {Array(6)
                          .fill(0)
                          .map((e, i) => (
                            <div
                              className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5 h-[286px] flex flex-col justify-between"
                              key={i}
                            >
                              <div className="skeleton-shine w-full h-[204px] rounded-[20px] max-[990px]:w-full mx-auto"></div>
                              <div className="skeleton-shine w-[80%] h-[24px] rounded-[7px] max-[990px]:w-full ml-2"></div>
                              <div className="skeleton-shine w-[50%] h-[24px] rounded-[7px] max-[990px]:w-full ml-2"></div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ) : tab === SHOP_TAB.COVER_PAGE ? (
                  <>
                    {isLoading ? (
                      <div className="grid grid-cols-1 min-[1248px]:grid-cols-2 gap-4">
                        {itemsShop?.map((e, i) => (
                          <CoverPageItem tab={tab} item={e} key={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 min-[1248px]:grid-cols-2 gap-4 w-fit">
                        {Array(4)
                          .fill(0)
                          .map((e, i) => (
                            <div
                              className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5 h-[286px] flex flex-col justify-between w-[366px]"
                              key={i}
                            >
                              <div className="skeleton-shine w-full h-[204px] rounded-[20px] max-[990px]:w-full mx-auto"></div>
                              <div className="skeleton-shine w-[80%] h-[24px] rounded-[7px] max-[990px]:w-full ml-2"></div>
                              <div className="skeleton-shine w-[50%] h-[24px] rounded-[7px] max-[990px]:w-full ml-2"></div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ) : tab === SHOP_TAB.PLAYTIMES ? (
                  <>
                    {isLoading ? (
                      <div
                        className="grid grid-cols-1 justify-center
                  min-[990px]:grid-cols-2 min-[1248px]:grid-cols-3 min-[1540px]:grid-cols-4 gap-4"
                      >
                        {itemsShop?.map((e, i) => (
                          <PlayTimeItem tab={tab} item={e} key={i} />
                        ))}
                      </div>
                    ) : (
                      <div
                        className="grid grid-cols-1 justify-center
                  min-[990px]:grid-cols-2 min-[1248px]:grid-cols-3 min-[1540px]:grid-cols-4 gap-4"
                      >
                        {Array(6)
                          .fill(0)
                          .map((e, i) => (
                            <div
                              className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5 h-[286px] flex flex-col justify-between"
                              key={i}
                            >
                              <div className="skeleton-shine w-full h-[204px] rounded-[20px] max-[990px]:w-full mx-auto"></div>
                              <div className="skeleton-shine w-[80%] h-[24px] rounded-[7px] max-[990px]:w-full ml-2"></div>
                              <div className="skeleton-shine w-[50%] h-[24px] rounded-[7px] max-[990px]:w-full ml-2"></div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ) : null}
              </>
            </div>
          </div>
        </div>
      </MainLayout>
      ;
    </>
  );
};

export default Shop;
