import { createContext, useContext, useMemo, useState } from "react";
import { STATUS } from "@/utils/constant";
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
  const socket = io(config.SERVER_CHAT);
  const [socketStatus, setSocketStatus] = useState(STATUS.INIT);
  const [isCountDown, setIsCountDown] = useState(false);
  const [socketClient, setSocketClient] = useState(socket);
  const [totalTimePlay, setTotalTimePlay] = useState(0);

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

    }),
    [
      socketStatus,
      isCountDown,
      socketClient,
      totalTimePlay,
    ]
  );

  return (
    <SocketContext.Provider value={{ socketProvider }}>
      {children}
    </SocketContext.Provider>
  );
};
