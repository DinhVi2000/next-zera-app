/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, memo, useEffect } from "react";

import Image from "next/image";

import ava from "@/../public/images/ava1.png";
import { IconSendMes } from "@/resources/icons";
import { ImgAva2 } from "@/resources/avatar/index";

import { useAuthContext } from "@/context/auth-context";
import { getArea } from "@/utils/helper";
import { useSocketContext } from "@/context/socket-context";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "@/services/game.service";

function BoxChat({ area }) {
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const roomCurrent = info?.id || 0;
  const inputRef = useRef();
  const refScroll = useRef();
  const refBoxChat = useRef();
  const { userInfo, anonymousInfo } = useAuthContext();
  const {
    isCountDown,
    setIsCountDown,
    socketClient,
    sendMessage,
    joinRoom,
    messageSocket,
    playGame,
    stopGame,
    remainningTime,
    emitReward,
    leaveGame,
    listenAllEvent,
  } = useSocketContext();
  const handleSendMessage = (e) => {
    sendMessage({
      socket_id: socketClient.id,
      msg: inputRef.current.value,
      user_id: !userInfo ? anonymousInfo?.uid : Number(userInfo?.id),
      room_id: roomCurrent,
      is_anonymous: !userInfo,
    });
    e.target.reset();
    e.preventDefault();
  };

  useEffect(() => {
    listenAllEvent();
  }, []);
  // Get all message of game
  useEffect(() => {
    const fetchMessages = async () => {
      const listMes = await getMessages(dispatch, info?.id);
      console.log(listMes);
      setMessages(listMes);
    };
    if (info?.id) {
      fetchMessages();
    }
  }, [info]);

  useEffect(() => {
    if (!messageSocket) return;
    setMessages(oldMes => [...oldMes].concat(messageSocket));
  }, [messageSocket]);

  useEffect(() => {
    // TODO: handle set is count dơn with play game action
    setIsCountDown(true);
    return () => {
      setIsCountDown(false);
    };
  }, []);

  // Effect start caculator time play
  useEffect(() => {
    if (userInfo || anonymousInfo) {
      if (isCountDown) {
        playGame({
          user_id: !userInfo ? anonymousInfo.uid : Number(userInfo?.id),
          room_id: roomCurrent,
          is_anonymous: !userInfo,
        });
      } else if (!isCountDown) {
        stopGame({
          user_id: !userInfo ? anonymousInfo.uid : Number(userInfo?.id),
          room_id: roomCurrent,
          is_anonymous: !userInfo,
        });
      }
    }
  }, [isCountDown, userInfo?.id]);

  useEffect(() => {
    remainningTime();
  }, []);

  // Join room
  useEffect(() => {
    if (userInfo || anonymousInfo) {
      joinRoom({
        user_id: !userInfo ? anonymousInfo?.uid : Number(userInfo?.id),
        room_id: roomCurrent,
        is_anonymous: !userInfo,
      });
    }
  }, [userInfo, anonymousInfo]);

  useEffect(() => {
    return () => {
      leaveGame({
        user_id: !userInfo ? anonymousInfo?.uid : Number(userInfo?.id),
        room_id: roomCurrent,
        is_anonymous: !userInfo ? true : false,
      });
    };
  }, []);
  // Scroll to Bottom
  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = refBoxChat.current.offsetHeight;
    }
  });

  return (
    <div
      style={{
        gridArea: getArea(area),
      }}
      className="w-full h-full mx-auto flex flex-col justify-between rounded-[10px] bg-[#55555580] backdrop-blur-{22px} text-white"
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
        <div className="overflow-y-auto h-full flex flex-col" ref={refScroll}>
          {/* Event */}
          <div className="all-mess" ref={refBoxChat}>
            {messages &&
              messages?.map((msg, i) => (
                <div key={i}>
                  <div
                    className={`w-full flex ${
                      Number(userInfo?.id) === msg.user_id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="flex flex-col my-[3px]" key={i}>
                      {Number(userInfo?.id) !== msg.user_id ? (
                        <div className="flex items-center text-[#ffffff80] mb-[5px]">
                          {/* <ImgAva2 className="mr-[6px]" /> */}
                          <img
                            src={msg?.user?.avatar ?? ImgAva2}
                            className="mr-[6px] w-4 h-4 rounded-full"
                          />
                          <div className="w-fit max-w-[150px] break-words">
                            {msg?.user?.username}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className={`${
                          Number(userInfo?.id) === msg.user_id
                            ? // owner
                              "mr-[2px] rounded-[10px] bg-[#EC4899] px-[6px] py-[3px] max-w-[150px] w-fit mb-[5px]"
                            : ""
                          // other
                        } rounded-[10px] bg-[#8B5CF6] px-[6px] py-[3px] max-w-[150px] w-fit`}
                      >
                        {msg?.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {emitReward?.map((info, i) => (
              <div key={i} className="text-[#ffffff80] text-center">
                {info.messages}
              </div>
            ))}
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          handleSendMessage(e);
        }}
      >
        <div className="flex items-center justify-between px-[20px] rounded-[10px] h-[37px] bg-[#52495e]">
          <input
            ref={inputRef}
            disabled={!userInfo}
            placeholder="Say something..."
            className="bg-transparent text-[10px] w-[126px] border-b-[1px] border-b-[#00000033] focus:border-b-white"
          />
          <div className="relative group">
            <button type="submit" disabled={!userInfo}>
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
