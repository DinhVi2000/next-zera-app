import { IconCoin, IconPlus, IconEdit } from "@/resources/icons";
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
              src={
                avatar ||
                "https://img.freepik.com/premium-vector/cute-animal-design_24911-11520.jpg?w=740"
              }
              className="w-[204px] h-[204px] object-cover rounded-[20px]"
            />

            <Tooltip label="Update avatar" aria-label="A tooltip">
              <div className="hidden group-hover:block rounded-[20px] absolute top-0 z-10 bg-[#00000099] box-border w-[204px] h-[204px]">
                <IconEdit className="absolute-center" />
              </div>
            </Tooltip>
          </div>

          <div className="flex justify-between max-[650px]:flex-col max-[650px]:flex-center flex-1 max-[650px]:flex-[0] w-[80%]">
            <div>
              <div className="w-auto max-[650px]:text-center max-[650px]:w-auto">
                <p className="font-semibold text-[28px]">{username}</p>
              </div>
              <div
                className="w-auto group cursor-pointer relative max-[650px]:text-center"
                onClick={() => handleOpenEdit(SHOP_TAB.AVATAR)}
              >
                <p className="font-medium overflow-hidden text-ellipsis whitespace-nowrap w-[500px] max-[1194px]:w-[300px] max-[1194px]:w-[200px] max-[650px]:text-[unset] max-[650px]:whitespace-normal max-[650px]:w-[100%] max-[650px]:px-10">
                  {quote}
                </p>
                <IconEdit
                  viewBox="0 0 42 42"
                  className="absolute top-[-10%] right-[-35px] group-hover:block hidden"
                />
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
