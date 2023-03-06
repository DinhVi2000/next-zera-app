import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME, VIEW_ALL_GAMES_TAB } from "@/utils/constant";
import { sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose, IconCoin22 } from "@/resources/icons";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Empty from "../empty/Empty";
import ImageLoading from "../loading/ImageLoading";

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

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 w-fit h-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-black px-[30px] pb-[20px]"
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="text-center text-[40px] mx-auto mt-[27px] font-bold">
            {tab}
          </div>
          <button onClick={handleCloseModal}>
            <IconClose viewBox="0 0 35 35" className="filter-svg" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-auto max-h-[500px]">
          <div>
            {payload?.listGame?.avatar?.length > 0 ? (
              <>
                {payload?.listGame?.avatar?.map((e, i) => (
                  <div className="flex-center">
                    <ImageLoading
                      key={i}
                      className="w-[94px] h-[94px] object-cover rounded-[20px] mb-[25px]"
                      src={e?.url}
                    />
                    <div className="p-2 px-4">
                      <div className="font-semibold text-xl flex">
                        {e?.price} <IconCoin22 />
                      </div>
                      <div>{e?.created_at}</div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-[400px] h-[200px]">
                <Empty />
              </div>
            )}
          </div>
          <div>
            {payload?.listGame?.cover?.length > 0 ? (
              <>
                {payload?.listGame?.cover?.map((e, i) => (
                  <div className="flex-center">
                    <ImageLoading
                      key={i}
                      className="w-[204px] h-[94px] object-cover rounded-[20px] mb-[25px]"
                      src={e?.url}
                    />
                    <div className="p-2 px-4">
                      <div className="font-semibold text-xl flex">
                        {e?.price} <IconCoin22 className="ml-2" />
                      </div>
                      <div>{e?.created_at}</div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-[400px] h-[200px]">
                <Empty />
              </div>
            )}
          </div>
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalPurchaseHistory;
