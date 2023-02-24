import React, { Fragment, memo, useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

// const DEADLINE =
//   (new Date(COUNTDOWN_DEALINE).getTime() - new Date().getTime()) / 1000;
const DEADLINE = 3600;

const Timer = () => {
  const Ref = useRef(null);
  const router = useRouter();

  const { route } = router ?? {};

  // The state for our timer
  const [timer, setTimer] = useState({
    days: "00",
    hours: "01",
    minutes: "00",
    seconds: "00",
  });

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date().toString());

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / 1000 / 60 / 60 / 24);

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { days, total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer({
        days: days > 9 ? days : "0" + days,
        hours: hours > 9 ? hours : "0" + hours,
        minutes: minutes > 9 ? minutes : "0" + minutes,
        seconds: seconds > 9 ? seconds : "0" + seconds,
      });
    }
  };

  const clearTimer = (e) => {
    if (!route.includes("/game/[gameId]")) {
      return;
    }

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(DEADLINE);

    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, [router]);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <Fragment>
      <div className="text-base font-numberic bg-pink-700 px-8 py-1.5 rounded-[10px] text-center count-down text-base">
        {timer.hours}:{timer.minutes}:{timer.seconds}
      </div>
    </Fragment>
  );
};

export default memo(Timer);
