import React, { useRef, useState, memo, useEffect } from "react";

import ava from "../../../public/images/ava1.png";
import { IconSendMes } from "@/resources/icons";
import { ImgAva2 } from "@/resources/avatar/index";
import Image from "next/image";

import { io } from "socket.io-client";
import { useRouter } from "next/router";

const socket = io("http://192.168.1.69:2023");
function BoxChat({ area }) {
  const { asPath } = useRouter();
  const userId = "TEST";
  const userCurrent = asPath.split("=")[1];

  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const divRef = useRef();

  const sendMessage = (e) => {
    socket.emit("chatMessage", {
      msg: inputRef.current.value,
      userId: userCurrent,
    });
    e.preventDefault();
    e.target.reset();
  };

  useEffect(() => {
    socket.emit("joinRoom", { userId: userCurrent, roomId: "Room 1" });
    socket.on("message", (dataMessage) => {
      setMessages((value) => {
        return [...value, dataMessage];
      });
    });
  }, []);

  // Scroll to Bottom
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
          <Image alt='user' src={ava} className="w-[22px] mr-[-10px]" />
          <Image alt='user' src={ava} className="w-[22px] mr-[-10px]" />
          <Image alt='user' src={ava} className="w-[22px] mr-[-10px]" />
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
