/* eslint-disable indent */
import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";
import {
  getBetweenTwoDate,
  sleep,
  toUpperCaseFirstLetter,
} from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose, IconCoin22 } from "@/resources/icons";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Empty from "../empty/Empty";
import ImageLoading from "../loading/ImageLoading";
import PaginatedItems from "../pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";

const ModalPurchaseHistory = () => {
  const { openModal, payload } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 0;
  const [tab, setTab] = useState(payload?.payload);

  const handleCloseModal = () => {
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useOnClickOutside(modal_ref, handleCloseModal);

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  const paginationAvatar = usePagination(4, payload?.listGame?.avatar);
  const paginationCover = usePagination(4, payload?.listGame?.cover);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 w-fit h-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-gradient-to-b from-[#580023] to-[#130023] px-[30px] pb-[20px] max-[500px]:px-2"
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="text-center text-[40px] mx-auto mt-[27px] font-bold max-[500px]:text-2xl">
            {toUpperCaseFirstLetter(tab?.replace("_", " "))}
          </div>
          <button onClick={handleCloseModal}>
            <IconClose viewBox="0 0 35 35" className="filter-svg" />
          </button>
        </div>

        <div>
          {payload?.listGame?.avatar?.length > 0 &&
          payload?.listGame?.cover?.length > 0 ? (
            <div className="overflow-auto max-h-[500px]">
              <div className="flex flex-col">
                <span className="font-bold text-2xl mb-3">Avatars</span>
                <div className="grid grid-cols-2 gap-x-9 max-[768px]:grid-cols-1">
                  {paginationAvatar?.currentItems?.map((e, i) => (
                    <div className="flex items-center justify-start" key={i}>
                      <ImageLoading
                        className="w-[94px] h-[94px] object-cover rounded-[20px] mb-[25px]"
                        src={e?.url}
                      />
                      <div className="p-2 px-4">
                        <div className="font-semibold text-xl flex">
                          {e?.price} <IconCoin22 />
                        </div>
                        <div>{getBetweenTwoDate(e?.created_at)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <PaginatedItems
                  onPageChange={paginationAvatar?.handlePageClick}
                  itemsPerPage={4}
                  items={payload?.listGame?.avatar}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl mb-3">Cover pages</span>
                <div className="grid grid-cols-2 gap-x-9 max-[768px]:grid-cols-1">
                  {paginationCover?.currentItems?.map((e, i) => (
                    <div
                      className="flex items-center justify-center max-[768px]:justify-start"
                      key={i}
                    >
                      <ImageLoading
                        className="w-[204px] h-[94px] object-cover rounded-[20px] mb-[25px]"
                        src={e?.url}
                      />
                      <div className="p-2 px-4">
                        <div className="font-semibold text-xl flex">
                          {e?.price} <IconCoin22 className="ml-2" />
                        </div>
                        <div>{getBetweenTwoDate(e?.created_at)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <PaginatedItems
                  onPageChange={paginationCover?.handlePageClick}
                  itemsPerPage={4}
                  items={payload?.listGame?.cover}
                />
              </div>
            </div>
          ) : (
            <div className="w-[400px] h-[200px] max-[500px]:w-full">
              <Empty />
            </div>
          )}
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalPurchaseHistory;
