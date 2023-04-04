/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  MODAL_NAME,
  SOCKET_EVENT,
  STATUS,
  STATUS_PLAY_GAME,
} from "@/utils/constant";

// import { socket } from "@/configs/socket";

import { config } from "@/envs";
import { io } from "socket.io-client";
import { useAuthContext } from "./auth-context";
import { getTimeRemaining } from "@/utils/common";
import { useRouter } from "next/router";
import { staticPaths } from "@/utils/$path";

const DEFAULT_TIME = {
  days: "00",
  hours: "01",
  isTimeOut: false,
  minutes: "00",
  seconds: "00",
  time: 3600000,
};

const SocketContext = createContext(null);

export const useSocketContext = () => {
  const socketContext = useContext(SocketContext);
  if (!socketContext) {
    throw new Error(
      "useSocketContext() can only be used inside of <SocketContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  const { socketProvider } = socketContext;
  return useMemo(() => ({ ...socketProvider }), [socketProvider]);
};

export const SocketContextProvider = ({ children }) => {
  const [socketCLI, setSocketCLI] = useState();

  const [connect, setConnect] = useState(false);
  const [sendMessageStatus, setSendMessageStatus] = useState(STATUS.NOT_START);
  const [newMessage, setNewMessage] = useState();
  const [systemMessage, setSystemMessage] = useState();

  const [isCountdown, setIsCountdown] = useState(false);
  const [countdownStatus, setCountdownStatus] = useState(STATUS.INIT);
  const [isLogged, setIsLogged] = useState(false);

  const {
    anonymousInfo,
    setAnonymousInfo,
    userInfo,
    setUserInfo,
    verifyStatus,
  } = useAuthContext();

  const [remainingTime, setRemainingTime] = useState(DEFAULT_TIME);

  const timeInterval = useRef();
  const timeDes = useRef(0);

  const router = useRouter();

  const resetState = () => {
    setIsLogged(false);
    setIsCountdown(false);
    setCountdownStatus(STATUS.INIT);
    timeDes.current = 0;
  };

  useEffect(() => {
    if (connect) {
      const socket = io(config.SERVER_CHAT);
      setSocketCLI(socket);
    }

    // return () => {
    //   socketCLI.emit(SOCKET_EVENT.USER_LEAVE_ROOM, {
    //   });
    // };

    if (!connect && socketCLI) {
      socketCLI.disconnect();
      resetState();
    }
  }, [connect]);

  // on events of user logged
  useEffect(() => {
    if (!socketCLI || verifyStatus !== STATUS.SUCCESS) return;

    socketCLI.on(SOCKET_EVENT.LISTEN_MESSAGE, (data) => {
      if (!data) return;
      if (data.is_message) {
        setSendMessageStatus(STATUS.SUCCESS);
        setNewMessage(data);
      } else {
        setSystemMessage(data);
        // bonus zera for current user
        if (data?.user?.id === userInfo?.id && data?.zera) {
          setUserInfo((prev) => ({
            ...prev,
            zera: (+prev?.zera || 0) + (+data?.zera || 0),
          }));
        }
      }
    });

    socketCLI.on(SOCKET_EVENT.USER_DUPLICATE_LOGIN, () => {
      router.push({ pathname: staticPaths.home, query: { isDuplicate: true } });
    });

    // socketCLI.on(SOCKET_EVENT.ANONYMOUS_LOGIN, () => {});
  }, [socketCLI, verifyStatus]);

  // anonymous login
  useEffect(() => {
    if (!socketCLI || !anonymousInfo || isLogged) return;
    const { uid } = anonymousInfo ?? {};

    socketCLI.emit(SOCKET_EVENT.ANONYMOUS_LOGIN, { anonymous_id: uid });
    setIsLogged(true);
  }, [socketCLI, anonymousInfo]);

  // set remaining time
  useEffect(() => {
    setRemainingTime(() =>
      getTimeRemaining(userInfo?.playtime || anonymousInfo?.playtime)
    );
  }, [anonymousInfo?.playtime, userInfo?.playtime]);

  // set user || anonymous playtime
  useEffect(() => {
    if (!isCountdown || countdownStatus === STATUS.IN_PROGRESS) return;

    setCountdownStatus(STATUS.IN_PROGRESS);

    timeInterval.current = setInterval(() => {
      timeDes.current += 1;
      const checkTimeRemaining =
        (+(userInfo?.playtime || anonymousInfo?.playtime) || 0) -
        timeDes.current;
      const checkTime = checkTimeRemaining > 0 ? checkTimeRemaining : 0;
      if (checkTimeRemaining <= 0) clearInterval(timeInterval.current);
      const time = getTimeRemaining(checkTime);

      setRemainingTime(time);
      userInfo?.playtime
        ? setUserInfo((prev) => ({ ...prev, playtime: checkTimeRemaining }))
        : setAnonymousInfo((prev) => ({
            ...prev,
            playtime: checkTimeRemaining,
          }));
    }, 1000);
  }, [anonymousInfo?.playtime, userInfo?.playtime, isCountdown]);

  const socketProvider = useMemo(
    () => ({
      socketCLI,
      setConnect,
      sendMessageStatus,
      setSendMessageStatus,
      systemMessage,
      setSystemMessage,
      newMessage,
      setNewMessage,
      isCountdown,
      setIsCountdown,
      remainingTime,
      setRemainingTime,
      timeInterval,
      timeDes,
    }),
    [
      socketCLI,
      setConnect,
      sendMessageStatus,
      setSendMessageStatus,
      systemMessage,
      setSystemMessage,
      newMessage,
      setNewMessage,
      isCountdown,
      setIsCountdown,
      remainingTime,
      setRemainingTime,
      timeInterval,
      timeDes,
    ]
  );

  return (
    <SocketContext.Provider value={{ socketProvider }}>
      {children}
    </SocketContext.Provider>
  );
};
