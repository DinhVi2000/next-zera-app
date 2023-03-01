import React, { useRef, useState, memo, useEffect, useMemo } from "react";

import Image from "next/image";

import ava from "@/../public/images/ava1.png";
import { IconSendMes } from "@/resources/icons";
import { ImgAva2 } from "@/resources/avatar/index";

import { io } from "socket.io-client";

import { useRouter } from "next/router";
import { useAuthContext } from "@/context/auth-context";

import { config } from "@/envs";

import { SOCKET_EVENT } from "@/utils/constant";

const socket = io(config.SERVER_CHAT);

function BoxChat({ area }) {
  const socket_id = socket?.id;

  const { userInfo, anonymousInfo } = useAuthContext();
  const userId = userInfo?.id;
  const anonymous_id = anonymousInfo?.id;

  const { asPath } = useRouter();

  const roomCurrent = useMemo(() => asPath.split("/").at(-1), [asPath]);

  const [messages, setMessages] = useState([]);
  const [emitReward, setEmitReward] = useState([]);

  const inputRef = useRef();
  const divRef = useRef();

  const sendMessage = (e) => {
    socket.emit(SOCKET_EVENT.USER_CHAT_MESSAGE, {
      msg: inputRef.current.value,
      userId,
    });
    e.preventDefault();
    e.target.reset();
  };

  useEffect(() => {
    if (!socket.connected) return;

    socket.on(SOCKET_EVENT.USER_GET_MESSAGE, (dataMessage) => {
      setMessages((value) => [...value, dataMessage]);
    });

    socket.on(SOCKET_EVENT.USER_EMIT_REWARD, (data) => {
      setEmitReward((value) => [...value, data]);
    });

    socket.on(SOCKET_EVENT.SOCKET_ERROR, (e) => {});
  }, [socket]);

  useEffect(() => {
    if (!socket?.connected || !userId) return;

    socket.emit(SOCKET_EVENT.USER_JOIN_ROOM, {
      userId,
      roomId: roomCurrent,
    });

    return () => {
      socket.emit(SOCKET_EVENT.USER_LEAVE_ROOM, {
        userId,
        roomId: roomCurrent,
      });
    };
  }, [socket, userId]);

  useEffect(() => {
    if (!socket?.connected || !anonymous_id) return;

    socket.emit(SOCKET_EVENT.ANONYMOUS_LOGIN, {
      anonymous_id,
      socket_id,
    });
  }, [socket, anonymous_id]);

  // scroll to bottom
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
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
        <div className="overflow-y-auto h-full flex flex-col box-chat">
          {/* Event */}
          <div className="text-[#ffffff80] text-center">
            Player X earn 10 Zera coin
          </div>
          <div className="all-mess">
            {messages?.map((msg, i) => (
              <div key={i}>
                <div
                  className={`w-full flex ${
                    userId === msg.userId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex flex-col my-[3px]" key={i}>
                    {userId !== msg.userId ? (
                      <div className="flex items-center text-[#ffffff80] mb-[5px]">
                        <ImgAva2 className="mr-[6px]" />
                        <div className="w-fit max-w-[150px] break-words">
                          {msg.userId}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className={`${
                        userId === msg.userId
                          ? // owner
                            "mr-[2px] rounded-[10px] bg-[#EC4899] px-[6px] py-[3px] max-w-[150px] w-fit mb-[5px]"
                          : ""
                        // other
                      } rounded-[10px] bg-[#8B5CF6] px-[6px] py-[3px] max-w-[150px] w-fit`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {emitReward?.map((info, i) => (
              <div
                key={i}
                className={`${
                  userId === info.userId
                    ? // owner
                      "mr-[2px] rounded-[10px] bg-[#EC4899] px-[6px] py-[3px] max-w-[150px] w-fit mb-[5px]"
                    : ""
                  // other
                } rounded-[10px] bg-[#8B5CF6] px-[6px] py-[3px] max-w-[150px] w-fit`}
              >
                {info.text}
              </div>
            ))}
            <div ref={divRef} />
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
