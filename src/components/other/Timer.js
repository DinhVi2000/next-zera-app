/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, memo, useEffect } from "react";

import Link from "next/link";

import { useSocketContext } from "@/context/socket-context";

const Timer = () => {
  const { remainingTime, timeInterval } = useSocketContext();

  // useEffect(() => {
  //   if (isCountDown?.status === STATUS_PLAY_GAME.NONE) return;
  //   if (Number(totalTimePlay) === 0) {
  //     openModal(MODAL_NAME.BUYTIME);
  //     return;
  //   }
  //   switch (isCountDown.status) {
  //     case STATUS_PLAY_GAME.PLAY:
  //       timeIntervalId.current = setInterval(() => {
  //         timeDes.current++;
  //         const checkTimeRemaining = Number(totalTimePlay) - timeDes.current;
  //         const checkTime = checkTimeRemaining > 0 ? checkTimeRemaining : 0;
  //         const time = getTimeRemaining(checkTime);
  //         if (checkTimeRemaining <= 0) {
  //           openModal(MODAL_NAME.BUYTIME);
  //           clearInterval(timeIntervalId.current);
  //         }
  //         setRemainingTime(time);
  //         setIncrementTime(timeDes.current);
  //       }, 1000);
  //       break;
  //     case STATUS_PLAY_GAME.STOP:
  //       clearInterval(timeIntervalId.current);
  //       if (!userData) break;
  //       setUserData((prev) => {
  //         const timeDown = timeDes.current;
  //         timeDes.current = 0;
  //         return { ...prev, playtime: prev.playtime - timeDown };
  //       });
  //       break;
  //     default:
  //       break;
  //   }

  //   return () => {
  //     clearInterval(timeIntervalId.current);
  //     if (!userData) return;
  //     setUserData((prev) => {
  //       const timeDown = timeDes.current;
  //       timeDes.current = 0;
  //       return { ...prev, playtime: prev.playtime - timeDown };
  //     });
  //   };
  // }, [isCountDown]);

  useEffect(() => {
    return () => {
      clearInterval(timeInterval.current);
    };
  }, []);

  return (
    <Fragment>
      <div className="font-numberic bg-pink-700 px-8 py-1.5 rounded-[10px] text-center count-down text-base relative group cursor-pointer hover:bg-[#53011c]">
        {remainingTime?.hours}:{remainingTime?.minutes}:{remainingTime?.seconds}
        <Link href={"/shop#playtimes"}>
          <div className="absolute-center text-sm font-semibold w-[90%] h-[70%] hidden group-hover:flex items-center justify-center bg-gradient-to-t from-[#3D0CA5] to-[#DE22CB] rounded-[20px]">
            Purchase more time
          </div>
        </Link>
      </div>

      {/* mobile */}
      {/* <Link href={"/shop#playtimes"}>
        <div className="tbl-flex mb-flex font-numberic bg-pink-700 rounded-[5px] text-center count-down text-[8px] h-5 flex-center">
          {remainingTime?.hours}:{remainingTime?.minutes}:
          {remainingTime?.seconds}
        </div>
      </Link> */}
    </Fragment>
  );
};

export default memo(Timer);
