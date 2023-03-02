/* eslint-disable @next/next/no-img-element */
import { IconCoin22 } from "@/resources/icons";
import React from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";
import ImageLoading from "../loading/ImageLoading";

const PlayTimeItem = ({ item, tab }) => {
  const { openModal, setPayload } = useModalContext();

  return (
    <>
      <div className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5">
        <ImageLoading
          src={item?.url}
          alt=""
          className="w-[204px] h-[204px] object-cover block mx-auto rounded-[20px] max-[990px]:w-full"
        />
        <p className="text-white text-base font-bold mt-[5px]">{item?.name}</p>
        <div className="flex justify-end text-sm">
          <div className="flex items-center gap-2 font-black">
            {item?.price} <IconCoin22></IconCoin22>
            <button
              onClick={() => {
                setPayload({ item, tab }), openModal(MODAL_NAME.BUY);
              }}
              className="bg-violet-700 px-[25px] py-[5px] rounded-[30px] border border-[#F5F3FF] font-medium
          hover:bg-[#350F1E] transition-all"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayTimeItem;
