import { useModalContext } from "@/context/modal-context";
import { IconInfo } from "@/resources/icons";
import { MODAL_NAME } from "@/utils/constant";
import React from "react";

function Report() {
  const { openModal } = useModalContext();

  return (
    <div
      onClick={() => {
        openModal(MODAL_NAME.REPORT);
      }}
    >
      <IconInfo className="cursor-pointer" />
    </div>
  );
}

export default Report;
