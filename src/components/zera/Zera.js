import React from "react";

import { useAuthContext } from "@/context/auth-context";
import { IconCoin, IconPlus } from "@/resources/icons";
import { abbreviateNumber } from "@/utils/helper";

function Zera() {
  const { userInfo } = useAuthContext();
  const { zera } = userInfo || {};

  return (
    <div className="h-fit w-fit px-[10px] py-[6px] flex items-center content-center bg-[#4C1D95] rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer">
      <p className=" font-black text-[24px] mr-[5px]">
        {abbreviateNumber(zera)}
      </p>
      <IconCoin className="mr-[5px] w-9 h-9" />
      <IconPlus className="w-8 h-8" />
    </div>
  );
}

export default Zera;
