import { IconEdit, IconArrUp, IconArrDown } from "@/resources/icons";
import { Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { SHOP_TAB, MODAL_NAME, STATUS } from "@/utils/constant";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";
import Zera from "../zera/Zera";
import {
  getCategoriesInventory,
  getItemInventory,
} from "@/services/user.service";

function InfoUser() {
  const { openModal, setPayload } = useModalContext();

  const { userInfo, verifyStatus } = useAuthContext();
  const { username, quote, avatar, cover } = userInfo || {};

  const [categories, setCategories] = useState([]);
  const [itemsInventory, setItemsInventory] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const getTabInventory = async () => {
    const { data } = await getCategoriesInventory();
    setCategories(data?.item_categories);
  };

  const getItem = async (id, name) => {
    const { data } = await getItemInventory(id);
    if (!data) return;
    setItemsInventory((prev) => {
      prev[name] = data?.user_inventory?.rows;
      return { ...prev };
    });
  };

  const handleOpenEdit = (tab) => {
    const item = itemsInventory[tab];
    setPayload({ item, tab });
    openModal(MODAL_NAME.EDIT_PROFILE);
  };

  useEffect(() => {
    getTabInventory();
  }, []);

  useEffect(() => {
    if (categories) {
      Promise.all(categories.map((e) => getItem(e.id, e?.name)));
    }
  }, [categories]);

  return (
    <>
      <div className="flex flex-col">
        <Tooltip label="Update cover image" aria-label="A tooltip">
          <div
            className="group cursor-pointer rounded-[20px] relative"
            onClick={() => handleOpenEdit(SHOP_TAB.COVER_PAGE)}
          >
            {verifyStatus === STATUS.SUCCESS ? (
              <ImageLoading
                alt=""
                className="w-full h-[350px] object-cover rounded-[20px] max-[700px]:h-[204px]"
                src={
                  cover ||
                  "https://img.freepik.com/free-vector/alien-spaceship-flying-cosmos-planets_33099-2480.jpg?w=1380&t=st=1677223897~exp=1677224497~hmac=47243c07b199f051b0b4d45aa862e0130fcecddea16570ed1592b829c11cf16f"
                }
              />
            ) : (
              <div className="skeleton-shine w-full h-[350px] rounded-[20px]"></div>
            )}
            <div className="hidden group-hover:block rounded-[20px] absolute bottom-0 right-0 z-10 box-border w-full h-full bg-[#00000099]">
              <IconEdit className="absolute-center" />
            </div>
          </div>
        </Tooltip>
        <div className="pl-[42px] max-[860px]:pl-3 flex items-end rounded-[20px] mt-[-100px] max-[650px]:flex-col max-[650px]:items-center">
          <div
            className="group w-[204px] rounded-[20px] cursor-pointer relative z-10 mr-4"
            onClick={() => handleOpenEdit(SHOP_TAB.AVATAR)}
          >
            <ImageLoading
              alt=""
              src={avatar || "/avatar-1.svg"}
              className="w-[204px] h-[204px] object-cover rounded-[20px]"
            />

            <Tooltip label="Update avatar" aria-label="A tooltip">
              <div className="hidden group-hover:block rounded-[20px] absolute top-0 z-10 bg-[#00000099] box-border w-[204px] h-[204px]">
                <IconEdit className="absolute-center" />
              </div>
            </Tooltip>
          </div>

          <div
            className={`flex justify-between max-[650px]:flex-col max-[650px]:flex-center flex-1 max-[650px]:flex-[0] w-[80%] relative max-[1221px]:top-5 max-[1178px]:top-10 max-[990px]:top-5 ${
              showMore
                ? "max-[790px]:top-10 max-[650px]:top-0 "
                : "max-[790px]:top-1"
            }`}
          >
            <div className="relative">
              <div className="w-auto max-[650px]:text-center max-[650px]:w-auto">
                <p className="font-semibold text-[28px]">{username}</p>
              </div>
              <div className="relative w-auto group cursor-pointer top-0 max-[650px]:text-center ">
                <p
                  onClick={() => handleOpenEdit(SHOP_TAB.AVATAR)}
                  className={`font-medium max-[650px]:w-[100%] max-[650px]:px-10 ${
                    showMore
                      ? "max-[650px]:h-fit text-[unset] whitespace-normal w-[700px] max-[1550px]:w-[500px] max-[1220px]:w-[400px] max-[1177px]:w-[280px] max-[990px]:w-[350px] max-[790px]:w-[250px] max-[662px]:w-[100px] max-[650px]:w-full"
                      : "max-[650px]:h-[30px] overflow-hidden text-ellipsis whitespace-nowrap w-[500px] max-[1550px]:w-[500px] max-[1220px]:w-[400px] max-[1177px]:w-[280px] max-[990px]:w-[350px] max-[790px]:w-[250px] max-[662px]:w-[100px] max-[650px]:w-full"
                  }`}
                >
                  {quote}
                  <IconEdit
                    viewBox="0 0 42 42"
                    className="absolute top-[-2%] right-[-25px] group-hover:block hidden"
                  />
                </p>
                {quote?.length > 55 && (
                  <span
                    className={`inline-block text-[#fc3c9c] font-semibold text-left w-fit mx-auto ${
                      showMore
                        ? "absolute top-11 max-[1220px]:top-16 max-[1178px]:top-[90px] max-[990px]:top-[65px] max-[790px]:top-[90px] max-[650px]:static"
                        : ""
                    }`}
                    onClick={() => setShowMore((value) => !value)}
                  >
                    {!showMore ? (
                      <span className="flex-center font-semibold">
                        Show more
                        <IconArrDown className="ml-1 w-3 h-3" />
                      </span>
                    ) : (
                      <span className="flex-center font-semibold">
                        Show less
                        <IconArrUp className="ml-1 w-3 h-3" />
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="max-[650px]:self-end justify-self-end">
              <Zera />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoUser;
