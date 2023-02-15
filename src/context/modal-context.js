import { createContext, useContext, useMemo, useState } from "react";

import Menubar from "@/components/ui/Menubar";

import { MODAL_NAME } from "@/utils/constant";

const ModalContext = createContext(null);

const Modal = {
  MENUBAR: <Menubar />,
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
  const [modal, setModal] = useState(MODAL_NAME.NONE);

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
    }),
    [modal]
  );

  return (
    <ModalContext.Provider value={{ modalProvider }}>
      {Modal[modal]}
      {children}
    </ModalContext.Provider>
  );
};
