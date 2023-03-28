/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SOCKET_EVENT, STATUS, STATUS_PLAY_GAME } from "@/utils/constant";
import { socket } from "@/configs/socket";
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
  const [isCountDown, setIsCountDown] = useState({ status: STATUS_PLAY_GAME.NONE });
  const [socketClient, setSocketClient] = useState(socket);
  const [totalTimePlay, setTotalTimePlay] = useState(0);
  const [incrementTime, setIncrementTime] = useState(0);
  const [messageSocket, setMessageSocket] = useState({});
  const [showModalBuyTime, setShowModalBuyTime] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState({});
  const [receiveZera, setReceiveZera] = useState(0);
  const [userLoginData, setUserLoginData] = useState({});

  const joinRoom = useCallback(
    ({ room_id, user_id, is_anonymous }) => {
      socket.emit(SOCKET_EVENT.USER_JOIN_ROOM, {
        user_id,
        room_id,
        is_anonymous,
      });
    },
    []
  );

  const sendMessage = useCallback(
    ({ room_id, user_id, msg, socket_id, is_anonymous }) => {
      socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
        room_id,
        user_id,
        msg,
        socket_id,
        is_anonymous,
      });
    },
    []
  );

  const playGame = useCallback(
    ({ room_id, user_id, is_anonymous }) => {
      socket.emit(SOCKET_EVENT.PLAY_GAME, {
        user_id,
        room_id,
        is_anonymous,
      });
    },
    []
  );

  const stopGame = useCallback(
    () => {
      socket.emit(SOCKET_EVENT.STOP_GAME);
    },
    []
  );

  const leaveGame = useCallback(
    ({ room_id, user_id, is_anonymous }) => {
      socket.emit(SOCKET_EVENT.USER_LEAVE_ROOM, {
        user_id,
        room_id,
        is_anonymous,
      });
    },
    []
  );

  const userLogin = useCallback(
    ({ username }) => {
      socket.emit(SOCKET_EVENT.USER_LOGIN, { username });
    },
    []
  );

  const userLogout = useCallback(
    ({ username }) => {
      socket.emit(SOCKET_EVENT.USER_LOGOUT, { username });
    },
    [socket]
  );

  /**
   * Listen user login
   */
  useEffect(() => {
    const onUserLogin = (data) => {
      if (!data) return;
      setUserLoginData(data);
    };

    socket.on(SOCKET_EVENT.LOGGED_IN_USER, onUserLogin);
    return () => {
      socket.off(SOCKET_EVENT.LOGGED_IN_USER);
    };
  }, []);

  /**
   * Listen user join room
   */
  useEffect(() => {
    const onUserJoinRoomEvent = (data) => {
      if (!data) return;
      setUsersInRoom(data.users);
    };
    socket.on(SOCKET_EVENT.LIST_USERS_JOIN_ROOM, onUserJoinRoomEvent);
    return () => {
      socket.off(SOCKET_EVENT.LIST_USERS_JOIN_ROOM);
    };
  }, []);

  /**
   * Listen message change
   */
  useEffect(() => {
    function onMessageEvent(data) {
      if (data?.user) {
        setReceiveZera(data.user.zera);
      }
      setMessageSocket(data);
    }
    socket.on(SOCKET_EVENT.LISTEN_MESSAGE, onMessageEvent);
    return () => {
      socket.off(SOCKET_EVENT.LISTEN_MESSAGE, onMessageEvent);
    };
  }, []);

  /**
   *  Open modal buy time when playing game and has been timeout
   */
  useEffect(() => {
    isCountDown.status === STATUS_PLAY_GAME.PLAY && incrementTime === totalTimePlay
      ? setShowModalBuyTime(true)
      : setShowModalBuyTime(false);
  }, [incrementTime]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

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
      messageSocket,
      setMessageSocket,
      stopGame,
      playGame,
      leaveGame,
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
      messageSocket,
      joinRoom,
      sendMessage,
      stopGame,
      playGame,
      leaveGame,
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
