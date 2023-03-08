import { getUserReward } from "@/services/user.service";
import {
  getBetweenTwoDate,
  notifyErrorMessage,
  toUpperCaseFirstLetter,
  abbreviateNumber,
} from "@/utils/helper";
import { Tooltip, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function Rewards() {
  const toast = useToast();
  const [rewards, setRewards] = useState([]);
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
  }, []);

  return (
    <div className="rounded-[20px] bg-[#00000080] pb-[80px] mt-[16px]">
      <h4 className="rounded-t-[20px] bg-[#EC4899] py-[22px] pl-[16px] text-[28px] font-bold">
        Rewards
      </h4>
      <div className="px-[28px] text-[20px]">
        {rewards?.map((e, i) => (
          <div className="mt-[34px]" key={i}>
            <p className="break-all w-full">
              Earn{" "}
              <Tooltip
                label={+e?.zera_amount > 999 && +e?.zera_amount}
                aria-label="A tooltip"
              >
                {abbreviateNumber(+e?.zera_amount)}
              </Tooltip>{" "}
              ZERA from {toUpperCaseFirstLetter(e?.type?.replaceAll("_", " "))}
            </p>
            <p className="opacity-60">{getBetweenTwoDate(e?.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rewards;
