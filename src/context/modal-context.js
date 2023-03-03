import { createContext, useContext, useMemo, useState } from "react";

import Menubar from "@/components/ui/Menubar";
import ModalEditProfile from "@/components/modal/ModalEditProfile";
import ModalViewAllGames from "@/components/modal/ModalViewAllGames";
import ModalDailyBonus from "@/components/modal/ModalDailyBonus";
import ModalBuy from "@/components/modal/ModalBuy";
import ModalConfirm from "@/components/modal/ModalConfirm";

import { MODAL_NAME, STATUS } from "@/utils/constant";

const ModalContext = createContext(null);

const Modal = {
  MENUBAR: <Menubar />,
  EDIT_PROFILE: <ModalEditProfile />,
  VIEW_ALL_GAMES: <ModalViewAllGames />,
  DAILY_BONUS: <ModalDailyBonus />,
  BUY: <ModalBuy />,
  CONFIRM: <ModalConfirm />,
};

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " +
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
