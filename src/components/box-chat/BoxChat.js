import React, { useRef, useState, memo, useEffect, useMemo } from "react";

import Image from "next/image";

import ava from "@/../public/images/ava1.png";
import { IconSendMes } from "@/resources/icons";
import { ImgAva2 } from "@/resources/avatar/index";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { config } from "@/envs";

import { SOCKET_EVENT } from "@/utils/constant";
import { useAuthContext } from "@/context/auth-context";

function BoxChat({ area }) {
  const socket = io(config.SERVER_CHAT);
  const { asPath } = useRouter();
  const roomCurrent = useMemo(() => asPath.split("/").at(-1), [asPath]);
  const [messages, setMessages] = useState([]);
  const [emitReward, setEmitReward] = useState([]);

  const inputRef = useRef();
  const refScroll = useRef();
  const refBoxChat = useRef();

  const { userInfo, anonymousInfo, setIsCountDown, isCountDown } = useAuthContext();
  const anonymous_id = anonymousInfo?.id;
  const [socketCLI, setSocketCLI] = useState(socket);
  const sendMessage = (e) => {
    socketCLI.emit("chatMessage", {
      socket_id: socketCLI.id,
      msg: inputRef.current.value,
      user_id: Number(userInfo?.id),
      room_id: roomCurrent,
    });
    e.preventDefault();
    e.target.reset();
  };

  useEffect(() => {
    setSocketCLI(socket);
    // TODO: handle set is count dơn with play game action
    setIsCountDown(true);
    return () => {
      setIsCountDown(false);
    };
  }, []);

  // Effect start caculator time play
  useEffect(() => {
    if (!userInfo?.id) return;
    if (isCountDown) {
      socketCLI.emit(SOCKET_EVENT.PLAY_GAME, { user_id: Number(userInfo?.id), room_id: roomCurrent });
    } else if (!isCountDown) {
      socketCLI.emit(SOCKET_EVENT.STOP_GAME, { user_id: Number(userInfo?.id), room_id: roomCurrent });
    }
  }, [isCountDown, userInfo?.id]);

  // login anonymuose
  useEffect(() => {
    if (!socketCLI?.connected || !anonymous_id) return;

    socket.emit(SOCKET_EVENT.ANONYMOUS_LOGIN, {
      anonymous_id,
      socket_id: socketCLI.id,
    });
  }, [socketCLI, anonymous_id]);

  useEffect(() => {
    if (!socketCLI.connected) return;
    socketCLI.emit("joinRoom", {
      user_id: Number(userInfo?.id),
      room_id: roomCurrent,
    });

    // Listen all user in room
    socketCLI.on("roomUsers", (data) => {

    });

    socketCLI.on("message", (dataMessage) => {
      if (dataMessage) {
        setMessages((oldMes) => {
          return oldMes.length < 0 ? dataMessage.messages : [...oldMes].concat(dataMessage.messages);
        });
      }
    });
    socketCLI.on("emitReward", (data) => {
      setEmitReward((value) => {
        return [...value, data];
      });
    });
    return () => {
      socketCLI.emit("leaveRoom", { user_id: Number(userInfo?.id), room_id: roomCurrent });
    };
  }, [socketCLI.connected]);
  // Scroll to Bottom

  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = refBoxChat.current.offsetHeight;
    }
  });

  return (
    <div
      style={{
        gridArea: `${area}/ ${area}/ ${area}/ ${area}`,
      }}
      className="w-[204px] h-[314px] mx-auto flex flex-col justify-between rounded-[10px] bg-[#55555580] backdrop-blur-{22px} text-white"
    >
      <div className="flex items-center justify-between px-[10px] rounded-[10px] h-[37px] bg-[#52495e]">
        <div className="flex">
          <Image alt="user" src={ava} className="w-[22px] mr-[-10px]" />
          <Image alt="user" src={ava} className="w-[22px] mr-[-10px]" />
          <Image alt="user" src={ava} className="w-[22px] mr-[-10px]" />
        </div>
        <p className="text-[12px]">+100 more</p>
      </div>
      <div className="text-[10px] h-[245px] pl-[10px] pr-[3px]">
        <div className="overflow-y-auto h-full flex flex-col box-chat" ref={refScroll}>
          {/* Event */}
          <div className="all-mess" ref={refBoxChat}>
            {messages && messages?.map((msg, i) => (
              <div key={i}>
                <div
                  className={`w-full flex ${Number(userInfo?.id) === msg.user_id ? "justify-end" : "justify-start"
                    }`}
                >
                  <div className="flex flex-col my-[3px]" key={i}>
                    {Number(userInfo?.id) !== msg.user_id ? (
                      <div className="flex items-center text-[#ffffff80] mb-[5px]">
                        <ImgAva2 className="mr-[6px]" />
                        <div className="w-fit max-w-[150px] break-words">
                          {msg.user_id}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className={`${Number(userInfo?.id) === msg.user_id
                          ? // owner
                          "mr-[2px] rounded-[10px] bg-[#EC4899] px-[6px] py-[3px] max-w-[150px] w-fit mb-[5px]"
                          : ""
                        // other
                        } rounded-[10px] bg-[#8B5CF6] px-[6px] py-[3px] max-w-[150px] w-fit`}
                    >
                      {msg.message}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {
              emitReward?.map((info, i) => (
                <div key={i} className="text-[#ffffff80] text-center">
                  {info.messages}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          sendMessage(e);
        }}
      >
        <div className="flex items-center justify-between px-[20px] rounded-[10px] h-[37px] bg-[#52495e]">
          <input
            ref={inputRef}
            placeholder="Say something..."
            className="bg-transparent text-[10px] w-[126px] border-b-[1px] border-b-[#00000033] focus:border-b-white"
          />
          <div className="relative group">
            <button type="submit">
              <IconSendMes className="cursor-pointer" />
              <div className="hidden group-hover:block absolute bottom-[-10px] right-[-15px] bg-zinc-800 text-[7px] p-[2px] rounded-[2px]">
                Send
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default memo(BoxChat);
