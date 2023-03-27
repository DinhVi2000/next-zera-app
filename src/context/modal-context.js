/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

import { useSocketContext } from "./socket-context";
import { useAuthContext } from "./auth-context";

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
  const { socketClient, userLoginData } = useSocketContext();
  const { usernameAuth, logout } = useAuthContext();

  // TODO: Only let the effect call fn once when mound, the rest only setState when status === success
  // vd: const [status, setStatus] = useState(STATUS.INIT);

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

  useEffect(() => {
    if (!socketClient && !usernameAuth) return;
    if (
      userLoginData.username === usernameAuth &&
      userLoginData.socket_id === socketClient.id
    ) {
      logout();
      openModal(MODAL_NAME.RESET_LOGIN);
    }
  }, [userLoginData]);
  return (
    <ModalContext.Provider value={{ modalProvider }}>
      {Modal[modal]}
      {children}
    </ModalContext.Provider>
  );
};
