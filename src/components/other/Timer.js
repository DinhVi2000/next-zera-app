import React, { Fragment, memo, useEffect, useRef, useState } from "react";

import { useAuthContext } from "@/context/auth-context";
import { getTimeRemaining } from "@/utils/common";
import { getUserInfo } from "@/services/user.service";

const Timer = () => {

  const timeIntervelId = useRef(null);

  const { userInfo, isCountDown, setUserInfo, usernameAuth } = useAuthContext();
  const [totalTimePlay, setTotalTimePlay] = useState(0);

  const [remainingTime, setRemainingTime] = useState(() => {
    return getTimeRemaining(totalTimePlay);
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserInfo(usernameAuth);
      setUserInfo(data);
    };
    getUser();
  }, [isCountDown]);

  useEffect(() => {
    setTotalTimePlay(userInfo?.playtime);
    setRemainingTime(getTimeRemaining(Number(userInfo?.playtime)));
  }, [userInfo]);

  useEffect(() => {
    if (!isCountDown) clearInterval(timeIntervelId.current);
  }, [isCountDown]);

  useEffect(() => {
    if (!isCountDown && totalTimePlay) return;
    let timeDes = 0;
    timeIntervelId.current = setInterval(() => {
      timeDes++;
      setRemainingTime(getTimeRemaining(Number(totalTimePlay) - timeDes));
    }, 1000);
    return () => {
      clearInterval(timeIntervelId.current);
    };
  }, [totalTimePlay, isCountDown]);

  return (
    <Fragment>
      <div className="font-numberic bg-pink-700 px-8 py-1.5 rounded-[10px] text-center count-down text-base">
        {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
      </div>
    </Fragment>
  );
};

export default memo(Timer);
