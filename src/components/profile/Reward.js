import { useModalContext } from "@/context/modal-context";
import { getUserReward } from "@/services/user.service";
import { STATUS } from "@/utils/constant";
import {
  getBetweenTwoDate,
  notifyErrorMessage,
  toUpperCaseFirstLetter,
  abbreviateNumber,
} from "@/utils/helper";
import { Tooltip, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Empty from "../empty/Empty";

function Rewards() {
  const { status, setStatus } = useModalContext();
  const [rewards, setRewards] = useState([]);
  const toast = useToast();

  const getRewardUser = async () => {
    try {
      const res = await getUserReward();
      setRewards(res?.data?.rows);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    getRewardUser();
  }, [status === STATUS.SUCCESS]);

  return (
    <div className="rounded-[20px] bg-[#00000080] pb-[80px] max-[1176px]:pb-6 mt-[16px] max-[1176px]:mt-0 max-[1176px]:w-[49%] max-[1176px]:h-[443px] max-[550px]:w-full max-[550px]:mt-5">
      <h4 className="rounded-t-[20px] bg-[#EC4899] py-[16px] pl-[16px] text-[28px] font-bold">
        Rewards
      </h4>
      <div className="max-[1176px]:px-4 max-[1176px]:pt-3 h-full">
        <div className="px-[28px] text-[20px] max-[400px]:text-[16px] overflow-auto max-[1176px]:h-[80%] max-[1176px]:px-5">
          {rewards?.length > 0 ? (
            <>
              {rewards?.map((e, i) => (
                <div className="mt-[34px] max-[1176px]:mt-[15px]" key={i}>
                  <p className="w-full">
                    {e?.type?.includes("BUY_AVATAR") ||
                    e?.type?.includes("BUY_COVER_PAGE") ||
                    e?.type?.includes("BUY_TIME")
                      ? "Spend "
                      : "Earn "}
                    <Tooltip
                      label={+e?.zera_amount > 999 && +e?.zera_amount}
                      aria-label="A tooltip"
                    >
                      {abbreviateNumber(+e?.zera_amount)}
                    </Tooltip>{" "}
                    ZERA from{" "}
                    {toUpperCaseFirstLetter(e?.type?.replaceAll("_", " "))}
                  </p>
                  <p className="opacity-60 text-base">
                    {getBetweenTwoDate(e?.created_at)}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="mx-auto h-full">
              <Empty />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rewards;
