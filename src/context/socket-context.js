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

// import { socket } from "@/configs/socket";

import { config } from "@/envs";
import { io } from "socket.io-client";

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

  useEffect(() => {
    if (connect) {
      const socket = io(config.SERVER_CHAT);
      setSocketCLI(socket);
    }

    // return () => {
    //   socketCLI.emit(SOCKET_EVENT.USER_LEAVE_ROOM, {
    //   });
    // };
  }, [connect]);

  useEffect(() => {
    if (!socketCLI) return;

    socketCLI.on(SOCKET_EVENT.LIST_USERS_JOIN_ROOM, (data) => {});

    socketCLI.on(SOCKET_EVENT.LISTEN_MESSAGE, (data) => {
      if (data?.is_message === true) {
        setSendMessageStatus(STATUS.SUCCESS);
        setNewMessage(data);
      } else if (data?.is_message === false) {
        setSystemMessage(data);
      }
    });
  }, [socketCLI]);

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
    ]
  );

  return (
    <SocketContext.Provider value={{ socketProvider }}>
      {children}
    </SocketContext.Provider>
  );
};
