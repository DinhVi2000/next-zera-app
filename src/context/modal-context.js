/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState } from "react";

import Menubar from "@/components/ui/Menubar";
import ModalEditProfile from "@/components/modal/ModalEditProfile";
import ModalPurchaseHistory from "@/components/modal/ModalPurchaseHistory";
import ModalDailyBonus from "@/components/modal/ModalDailyBonus";
import ModalBuy from "@/components/modal/ModalBuy";
import ModalConfirm from "@/components/modal/ModalConfirm";
import ModalReport from "@/components/modal/ModalReport";
import ModalBuyTime from "@/components/modal/ModalBuyTime";
import ModalUsersOnline from "@/components/modal/ModalUsersOnline";
import ModalPlaylist from "@/components/modal/ModalPlaylist";
import ModalDeletePlaylist from "@/components/modal/ModalDeletePlaylist";
import ModalResetLogin from "@/components/modal/ModalResetLogin";

import { MODAL_NAME, STATUS } from "@/utils/constant";

const ModalContext = createContext(null);

const Modal = {
  MENUBAR: <Menubar />,
  EDIT_PROFILE: <ModalEditProfile />,
  VIEW_PURCHASE_HISTORY: <ModalPurchaseHistory />,
  DAILY_BONUS: <ModalDailyBonus />,
  BUY: <ModalBuy />,
  PLAYLIST: <ModalPlaylist />,
  DELETE_PLAYLIST: <ModalDeletePlaylist />,
  CONFIRM: <ModalConfirm />,
  REPORT: <ModalReport />,
  BUYTIME: <ModalBuyTime />,
  USERS_ONLINE_GAME: <ModalUsersOnline />,
  RESET_LOGIN: <ModalResetLogin />,
};

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error(
      "useModalContext() can only be used inside of <ModalContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  const { modalProvider } = modalContext;
  return useMemo(() => ({ ...modalProvider }), [modalProvider]);
};

export const ModalContextProvider = ({ children }) => {
  const [payload, setPayload] = useState();
  const [modal, setModal] = useState(MODAL_NAME.NONE);
  const [status, setStatus] = useState(STATUS.NOT_START);

  const closeModal = () => {
    setModal(MODAL_NAME.NONE);
  };

  const openModal = (modalName) => {
    setModal(modalName);
  };

  const modalProvider = useMemo(
    () => ({
      modal,
      openModal,
      closeModal,
      payload,
      setPayload,
      status,
      setStatus,
    }),
    [modal, status, payload]
  );

  return (
    <ModalContext.Provider value={{ modalProvider }}>
      {Modal[modal]}
      {children}
    </ModalContext.Provider>
  );
};
