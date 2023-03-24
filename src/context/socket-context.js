/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SOCKET_EVENT, STATUS } from "@/utils/constant";
import { io } from "socket.io-client";
import { config } from "@/envs";
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
  const [socketStatus, setSocketStatus] = useState(STATUS.INIT);
  const [isCountDown, setIsCountDown] = useState(false);
  const [socketClient, setSocketClient] = useState();
  const [totalTimePlay, setTotalTimePlay] = useState(0);
  const [incrementTime, setIncrementTime] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [messageSocket, setMessageSocket] = useState({});
  const [showModalBuyTime, setShowModalBuyTime] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState({});
  const [receiveZera, setReceiveZera] = useState(0);
  const [userLoginData, setUserLoginData] = useState({});

  const connectSocket = () => {
    const socket = io(config.SERVER_CHAT);
    setSocketClient(socket);
    setIsConnected(true);
  };

  const disconnect = () => isConnected && socketClient.disconnect();

  const joinRoom = useCallback(
    ({ room_id, user_id, is_anonymous }) => {
      if (!isConnected) return;
      socketClient.emit(SOCKET_EVENT.USER_JOIN_ROOM, {
        user_id,
        room_id,
        is_anonymous,
      });
    },
    [socketClient, isConnected]
  );

  const sendMessage = useCallback(
    ({ room_id, user_id, msg, socket_id, is_anonymous }) => {
      if (!isConnected) return;
      socketClient.emit(SOCKET_EVENT.SEND_MESSAGE, {
        room_id,
        user_id,
        msg,
        socket_id,
        is_anonymous,
      });
    },
    [socketClient, isConnected]
  );

  const listenAllEvent = useCallback(() => {
    if (socketClient) {
      socketClient.on(SOCKET_EVENT.LISTEN_MESSAGE, (data) => {
        if (!data) return;
        if (data?.zera) {
          setReceiveZera(data.zera);
        }
        setMessageSocket(data);
      });
      socketClient.on(SOCKET_EVENT.TIME_GAME, () => {});
      socketClient.on(SOCKET_EVENT.LIST_USERS_JOIN_ROOM, (data) => {
        if (!data) return;
        setUsersInRoom(data.users);
      });
      socketClient.on(SOCKET_EVENT.LOGGED_IN_USER, (data) => {
        if (!data) return;
        setUserLoginData(data);
      });
    }
  }, [socketClient]);

  const playGame = useCallback(
    ({ room_id, user_id, is_anonymous }) => {
      socketClient.emit(SOCKET_EVENT.PLAY_GAME, {
        user_id,
        room_id,
        is_anonymous,
      });
    },
    [socketClient]
  );

  const stopGame = useCallback(() => {
    socketClient.emit(SOCKET_EVENT.STOP_GAME);
  }, [socketClient]);

  const leaveGame = useCallback(
    ({ room_id, user_id, is_anonymous }) => {
      socketClient.emit(SOCKET_EVENT.USER_LEAVE_ROOM, {
        user_id,
        room_id,
        is_anonymous,
      });
    },
    [socketClient]
  );

  const userLogin = useCallback(
    ({ username }) => {
      if (!socketClient) return;
      socketClient.emit(SOCKET_EVENT.USER_LOGIN, { username });
    },
    [socketClient]
  );

  const userLogout = useCallback(
    ({ username }) => {
      if (!socketClient) return;
      socketClient.emit(SOCKET_EVENT.USER_LOGOUT, { username });
    },
    [socketClient]
  );

  useEffect(() => {
    if (!socketClient) return;
    socketClient.on("connect", () => {
      listenAllEvent();
    });
  }, [socketClient, listenAllEvent]);

  useEffect(() => {
    if (!isConnected) {
      connectSocket();
    }
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    isCountDown === true && incrementTime === totalTimePlay
      ? setShowModalBuyTime(true)
      : setShowModalBuyTime(false);
  }, [incrementTime]);

  const socketProvider = useMemo(
    () => ({
      socketStatus,
      setSocketStatus,
      isCountDown,
      setIsCountDown,
      socketClient,
      setSocketClient,
      totalTimePlay,
      setTotalTimePlay,
      joinRoom,
      sendMessage,
      isConnected,
      messageSocket,
      setMessageSocket,
      stopGame,
      playGame,
      leaveGame,
      listenAllEvent,
      setIncrementTime,
      incrementTime,
      showModalBuyTime,
      setShowModalBuyTime,
      usersInRoom,
      receiveZera,
      setReceiveZera,
      userLogin,
      userLoginData,
      userLogout,
    }),
    [
      socketStatus,
      isCountDown,
      socketClient,
      totalTimePlay,
      isConnected,
      messageSocket,
      joinRoom,
      sendMessage,
      stopGame,
      playGame,
      leaveGame,
      listenAllEvent,
      setIncrementTime,
      incrementTime,
      showModalBuyTime,
      setShowModalBuyTime,
      usersInRoom,
      receiveZera,
      setReceiveZera,
      userLogin,
      userLoginData,
      userLogout,
    ]
  );

  return (
    <SocketContext.Provider value={{ socketProvider }}>
      {children}
    </SocketContext.Provider>
  );
};
