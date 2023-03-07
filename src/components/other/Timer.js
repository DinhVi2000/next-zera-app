import React, { Fragment, memo, useEffect, useRef, useState } from "react";

import { useAuthContext } from "@/context/auth-context";
import { getTimeRemaining } from "@/utils/common";
import { getUserAnonymous, getUserInfo } from "@/services/user.service";
import { SOCKET_EVENT } from "@/utils/constant";

const Timer = () => {
  const timeIntervelId = useRef(null);
  const { isCountDown, usernameAuth, anonymousInfo, socketClient, decrementTime, setDecrementTime } = useAuthContext();
  const [totalTimePlay, setTotalTimePlay] = useState(0);
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
        setUserData({ ...anonymous, playtime: anonymous.playtime - decrementTime });
      }
    };
    if (anonymousInfo && !usernameAuth) {
      handleLogin();
    }
  }, [anonymousInfo, socketClient, usernameAuth]);

  /**
   * Get user info if user sigin
   */
  useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserInfo(usernameAuth);
      setUserData(data);
    };
    if (usernameAuth) {
      getUser();
    }
  }, [usernameAuth]);

  /**
   *  Set total playtime
   */
  useEffect(() => {
    if (userData) {
      setTotalTimePlay(userData?.playtime || 0);
      setRemainingTime(getTimeRemaining(Number(userData?.playtime) || 0));
    }
  }, [userData]);
  /**
   *  Countdown time play
   */
  useEffect(() => {
    if (!isCountDown && totalTimePlay) return;
    // setDecrementTime(0);
    let timeDes = 0;
    timeIntervelId.current = setInterval(() => {
      timeDes++;
      const time = getTimeRemaining(Number(totalTimePlay) - timeDes > 0 ? Number(totalTimePlay) - timeDes : 0);
      setRemainingTime(time);
    }, 1000);

    return () => {
      clearInterval(timeIntervelId.current);
    };
  }, [totalTimePlay, isCountDown]);

  return (
    <Fragment>
      <div className="mb-hidden font-numberic bg-pink-700 px-8 py-1.5 rounded-[10px] text-center count-down text-base">
        {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
      </div>

      {/* mobile */}
      <div className="mb-flex font-numberic bg-pink-700 rounded-[5px] text-center count-down text-[8px] h-5 flex-center">
        {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
      </div>
    </Fragment>
  );
};

export default memo(Timer);
