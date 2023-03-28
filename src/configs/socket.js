import { io } from "socket.io-client";
import { config } from "@/envs";
const URL = config.SERVER_CHAT;

export const socket = io(URL, {
  autoConnect: false,
});
