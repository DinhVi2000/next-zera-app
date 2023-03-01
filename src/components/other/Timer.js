import React, { Fragment, memo, useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { useAuthContext } from "@/context/auth-context";

const Timer = () => {
  const Ref = useRef(null);
  const router = useRouter();

  const { route } = router ?? {};

  const { userInfo } = useAuthContext();

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
    const Anonymous = JSON.parse(localStorage.getItem("Anonymous")) ?? {};
    if (Anonymous === "null") {
      localStorage.setItem("Anonymous", JSON.stringify({ playTime: 0 }));
    }

    const { playTime } = Anonymous ?? {};
    localStorage.setItem(
      "Anonymous",
      JSON.stringify({ playTime: (playTime || 0) + 1 })
    );
  };

  const runTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);

    let id = setInterval(() => {
      startTimer(e);
    }, 1000);

    Ref.current = id;
  };

  const getDeadTime = (seconds) => {
    const Anonymous = JSON.parse(localStorage.getItem("Anonymous")) ?? {};
    const { playTime } = Anonymous ?? {};

    let deadline = new Date();
    deadline.setTime(deadline.getTime() + (seconds - playTime) * 1000);

    return deadline;
  };

  useEffect(() => {
    if (!route.includes("/game/[gameId]")) return;

    runTimer(getDeadTime(3600));
  }, [router]);

  useEffect(() => {
    return () => {
      clearInterval(Ref.current);
    };
  }, []);

  return (
    <Fragment>
      <div className="font-numberic bg-pink-700 px-8 py-1.5 rounded-[10px] text-center count-down text-base">
        {timer.hours}:{timer.minutes}:{timer.seconds}
      </div>
    </Fragment>
  );
};

export default memo(Timer);
