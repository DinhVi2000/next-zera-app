/* eslint-disable @next/next/no-img-element */
import { IconCoin22 } from "@/resources/icons";
import React from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";

const CoverPageItem = ({ cover, itemsBought }) => {
  const { openModal, setPayload } = useModalContext();
  const isOwner = itemsBought.some((e) => e.item_id == cover.id);

  return (
    <>
      <div className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5">
        <img
          src={cover.url}
          alt=""
          className="w-[446px] h-[204px] object-cover inline-block rounded-[20px]"
        />
        <p className="text-white text-base font-bold mt-[5px]">{cover.name}</p>
        <div className="flex justify-end text-sm">
          {isOwner ? (
            <button className="bg-[#350F1E] px-[25px] py-[5px] rounded-[30px] border border-[#F5F3FF] font-medium">
              Owned
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 font-black">
                {cover.price} <IconCoin22></IconCoin22>
              </div>
              <button
                onClick={() => {
                  setPayload(cover), openModal(MODAL_NAME.BUY);
                }}
                className="bg-violet-700 px-[25px] py-[5px] rounded-[30px] border border-[#F5F3FF] font-medium 
          hover:bg-[#350F1E] transition-all"
              >
                Buy
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoverPageItem;
