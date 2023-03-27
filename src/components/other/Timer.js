/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, memo, useEffect, useRef, useState } from "react";

import { useAuthContext } from "@/context/auth-context";
import { getTimeRemaining } from "@/utils/common";
import { getUserAnonymous, getUserInfo } from "@/services/user.service";
import { MODAL_NAME, SOCKET_EVENT, STATUS } from "@/utils/constant";
import { useSocketContext } from "@/context/socket-context";
import { useModalContext } from "@/context/modal-context";

const Timer = () => {
  const timeIntervalId = useRef(null);
  const timeDes = useRef(0);
  const { usernameAuth, anonymousInfo } = useAuthContext();
  const {
    isCountDown,
    socketClient,
    setTotalTimePlay,
    totalTimePlay,
    socketStatus,
    setIncrementTime,
  } = useSocketContext();
  const { openModal } = useModalContext();
  const [userData, setUserData] = useState();
  const [remainingTime, setRemainingTime] = useState(() => {
    return getTimeRemaining(totalTimePlay);
  });
  /**
   *  Login anonymous if user not sign in
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
   * Get user info if user sign in
   */
  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await getUserInfo(usernameAuth);
      setUserData(data);
    };

    if (
      usernameAuth &&
      (socketStatus === STATUS.SUCCESS || socketStatus === STATUS.INIT)
    ) {
      fetchUserData();
    }
  }, [usernameAuth, socketStatus]);

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
    if (Number(totalTimePlay) === 0) {
      openModal(MODAL_NAME.BUYTIME);
      return;
    }
    timeIntervalId.current = setInterval(() => {
      timeDes.current++;
      const checkTimeRemaining = Number(totalTimePlay) - timeDes.current;
      const checkTime = checkTimeRemaining > 0 ? checkTimeRemaining : 0;
      const time = getTimeRemaining(checkTime);
      if (checkTimeRemaining <= 0) {
        openModal(MODAL_NAME.BUYTIME);
        clearInterval(timeIntervalId.current);
      }
      setRemainingTime(time);
      setIncrementTime(timeDes.current);
    }, 1000);

    return () => {
      clearInterval(timeIntervalId.current);
      if (!userData) return;
      setUserData(prev => {
        const timeDown = timeDes.current;
        timeDes.current = 0;
        return { ...prev, playtime: prev.playtime - timeDown };
      });
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
