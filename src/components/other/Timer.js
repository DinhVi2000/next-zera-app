import React, { Fragment, memo, useEffect, useRef, useState } from "react";

import { useAuthContext } from "@/context/auth-context";
import { getTimeRemaining } from "@/utils/common";
import { getUserAnonymous, getUserInfo } from "@/services/user.service";
import { SOCKET_EVENT, STATUS } from "@/utils/constant";
import { useSocketContext } from "@/context/socket-context";

const Timer = () => {
  const timeIntervalId = useRef(null);
  const { usernameAuth, anonymousInfo } = useAuthContext();
  const {
    isCountDown,
    socketClient,
    setTotalTimePlay,
    totalTimePlay,
    socketStatus,
    setIncrementTime,
  } = useSocketContext();

  const [userData, setUserData] = useState();
  const [remainingTime, setRemainingTime] = useState(() => {
    return getTimeRemaining(totalTimePlay);
  });
  /**
   *  Login anonymous if user not sigin
   */
  useEffect(() => {
    const handleLogin = async () => {
      const anonymous = await getUserAnonymous(anonymousInfo.uid);
      if (!anonymous) {
        socketClient.emit(SOCKET_EVENT.ANONYMOUS_LOGIN, {
          anonymous_id: anonymousInfo.uid,
          socket_id: socketClient.id,
        });
        setUserData({ playtime: 3600 });
      } else {
        setUserData(anonymous);
      }
    };
    if (
      anonymousInfo &&
      !usernameAuth &&
      (socketStatus === STATUS.SUCCESS || socketStatus === STATUS.INIT)
    ) {
      handleLogin();
    }
  }, [anonymousInfo, socketClient, usernameAuth, socketStatus]);

  /**
   * Get user info if user sigin
   */
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const { data } = await getUserInfo(usernameAuth);
  //     setUserData(data);
  //   };

  //   if (
  //     usernameAuth &&
  //     (socketStatus === STATUS.SUCCESS || socketStatus === STATUS.INIT)
  //   ) {
  //     fetchUserData();
  //   }
  // }, [usernameAuth, socketStatus]);

  /**
   *  Set total playtime
   */
  useEffect(() => {
    if (userData) {
      setTotalTimePlay(userData?.playtime);
      setRemainingTime(getTimeRemaining(Number(userData?.playtime)));
    }
  }, [userData]);
  /**
   *  Countdown time play
   */
  useEffect(() => {
    if (!isCountDown) return;

    let timeDes = 0;
    timeIntervalId.current = setInterval(() => {
      timeDes++;
      const time = getTimeRemaining(
        Number(totalTimePlay) - timeDes > 0
          ? Number(totalTimePlay) - timeDes
          : 0
      );
      setRemainingTime(time);
      setIncrementTime(timeDes);
    }, 1000);

    return () => {
      clearInterval(timeIntervalId.current);
    };
  }, [isCountDown]);

  return (
    <Fragment>
      <div className="tbl-hidden mb-hidden font-numberic bg-pink-700 px-8 py-1.5 rounded-[10px] text-center count-down text-base">
        {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
      </div>

      {/* mobile */}
      <div className="tbl-flex mb-flex font-numberic bg-pink-700 rounded-[5px] text-center count-down text-[8px] h-5 flex-center">
        {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
      </div>
    </Fragment>
  );
};

export default memo(Timer);
