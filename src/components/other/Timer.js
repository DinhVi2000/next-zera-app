/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, memo, useEffect, useRef, useState } from "react";

import { useAuthContext } from "@/context/auth-context";
import { getTimeRemaining } from "@/utils/common";
import { getUserAnonymous, getUserInfo } from "@/services/user.service";
import {
  MODAL_NAME,
  SOCKET_EVENT,
  STATUS,
  STATUS_PLAY_GAME,
} from "@/utils/constant";
import { useSocketContext } from "@/context/socket-context";
import { useModalContext } from "@/context/modal-context";
import Link from "next/link";

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
    if (isCountDown?.status === STATUS_PLAY_GAME.NONE) return;
    if (Number(totalTimePlay) === 0) {
      openModal(MODAL_NAME.BUYTIME);
      return;
    }
    switch (isCountDown.status) {
      case STATUS_PLAY_GAME.PLAY:
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
        break;
      case STATUS_PLAY_GAME.STOP:
        clearInterval(timeIntervalId.current);
        if (!userData) break;
        setUserData((prev) => {
          const timeDown = timeDes.current;
          timeDes.current = 0;
          return { ...prev, playtime: prev.playtime - timeDown };
        });
        break;
      default:
        break;
    }

    return () => {
      clearInterval(timeIntervalId.current);
      if (!userData) return;
      setUserData((prev) => {
        const timeDown = timeDes.current;
        timeDes.current = 0;
        return { ...prev, playtime: prev.playtime - timeDown };
      });
    };
  }, [isCountDown]);

  return (
    <Fragment>
      <div className="tbl-hidden mb-hidden font-numberic bg-pink-700 px-8 py-1.5 rounded-[10px] text-center count-down text-base relative group cursor-pointer hover:bg-[#53011c]">
        {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
        <Link href={"/shop#playtimes"}>
          <div className="absolute-center text-sm font-semibold w-[90%] h-[70%] hidden group-hover:flex items-center justify-center bg-gradient-to-t from-[#3D0CA5] to-[#DE22CB] rounded-[20px]">
            Purchase more time
          </div>
        </Link>
      </div>

      {/* mobile */}
      <Link href={"/shop#playtimes"}>
        <div className="tbl-flex mb-flex font-numberic bg-pink-700 rounded-[5px] text-center count-down text-[8px] h-5 flex-center">
          {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
        </div>
      </Link>
    </Fragment>
  );
};

export default memo(Timer);
