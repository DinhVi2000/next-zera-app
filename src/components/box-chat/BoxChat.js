import React, { useRef, useState } from "react";
import { IconSendMes } from "@/resources/icons";
import { ImgAva2 } from "@/resources/avatar/index";
import ava from "../../../public/images/ava1.png";
import Image from "next/image";

function BoxChat() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, inputRef.current.value]);
    e.target.reset();
  };

  return (
    <div className="w-[204px] h-[314px] mx-auto flex flex-col justify-between rounded-[10px] bg-[#55555580] backdrop-blur-{22px}">
      <div className="flex items-center justify-between px-[10px] rounded-[10px] h-[37px] bg-[#52495e]">
        <div className="flex">
          <Image src={ava} className="w-[22px] mr-[-10px]" />
          <Image src={ava} className="w-[22px] mr-[-10px]" />
          <Image src={ava} className="w-[22px] mr-[-10px]" />
        </div>
        <p className="text-[12px]">+100 more</p>
      </div>
      <div className="text-[10px] h-[245px] pl-[10px] pr-[3px]">
        <div className="overflow-y-auto h-full flex flex-col box-chat">
          {/* Other mess */}
          <div className="flex flex-col my-[3px]">
            <div className="flex items-center text-[#ffffff80] mb-[5px]">
              <ImgAva2 className="mr-[6px]" />
              <div className="w-fit max-w-[150px] break-words">
                Name Loremsssss
              </div>
            </div>
            <div className="rounded-[10px] bg-[#8B5CF6] px-[6px] py-[3px] max-w-[150px] w-fit">
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
            </div>
          </div>

          {/* Event */}
          <div className="text-[#ffffff80] text-center">
            Player X earn 10 Zera coin
          </div>

          {messages?.map((msg, i) => (
            <div
              key={i}
              className="mr-[2px] rounded-[10px] bg-[#EC4899] px-[6px] py-[3px] max-w-[150px] w-fit mb-[5px] self-end"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={sendMessage}>
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

export default BoxChat;
