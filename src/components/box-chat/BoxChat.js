/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, memo, useEffect } from "react";
import moment from "moment";
import Image from "next/image";

import { IconSendMes } from "@/resources/icons";
import { useAuthContext } from "@/context/auth-context";
import { getArea } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import ImageLoading from "../loading/ImageLoading";
import Link from "next/link";
import { MODAL_NAME, SOCKET_EVENT, STATUS } from "@/utils/constant";
import { useModalContext } from "@/context/modal-context";
import { dynamicPaths, staticPaths } from "@/utils/$path";
import { useSocketContext } from "@/context/socket-context";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";

function BoxChat({ area }) {
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};
  const { get } = useApi();

  const [messages, setMessages] = useState([]);
  // const [limitChat, setLimitChat] = useState({
  //   lastTime: moment().startOf("minute").minutes(),
  //   limitMessage: 0,
  // });

  const inputRef = useRef();
  const boxChatWrapperRef = useRef();
  const boxChatRef = useRef();

  const { userInfo, token, verifyStatus } = useAuthContext();
  const { openModal } = useModalContext();
  const {
    socketCLI,
    sendMessageStatus,
    setSendMessageStatus,
    systemMessage,
    newMessage,
  } = useSocketContext();

  const handleSendMessage = (e) => {
    e.preventDefault();
    socketCLI.emit(SOCKET_EVENT.SEND_MESSAGE, { msg: inputRef.current.value });
    setSendMessageStatus(STATUS.IN_PROGRESS);
  };

  useEffect(() => {
    if (!socketCLI || verifyStatus !== STATUS.SUCCESS || !info) return;
    socketCLI.emit(SOCKET_EVENT.USER_JOIN_ROOM, { room_id: info.id, token });
  }, [socketCLI, verifyStatus, info]);

  useEffect(() => {
    if (verifyStatus !== STATUS.SUCCESS || !info) return;
    get(apiURL.get.all_messages_by_room_id(info?.id)).then((data) =>
      setMessages(data)
    );
  }, [verifyStatus, info]);

  //  send msg
  useEffect(() => {
    if (sendMessageStatus === STATUS.SUCCESS && newMessage) {
      setMessages((prev) => [...prev, newMessage]);
      boxChatRef.current.scrollTo({
        bottom: 0,
        left: 0,
        behavior: "smooth",
      });
      inputRef.current.value = "";

      // scroll to Bottom
      if (boxChatWrapperRef.current) {
        boxChatWrapperRef.current.scrollTo({
          top: boxChatRef.current.offsetHeight,
          behavior: "smooth",
        });
      }
    }
  }, [sendMessageStatus, newMessage]);

  useEffect(() => {
    if (systemMessage) setMessages((prev) => [...prev, systemMessage]);
  }, [systemMessage]);

  return (
    <div
      style={{
        gridArea: getArea(area),
      }}
      className="w-full h-full mx-auto flex flex-col justify-between rounded-[10px] bg-[#55555580] backdrop-blur-{22px} text-white"
    >
      {!userInfo ? (
        <div className="flex-center flex-col h-full text-lg text-center">
          Please login to chat!{" "}
          <Link href={staticPaths.login}>
            <button
              type="submit"
              className="text-base rounded-[20px] bg-linear-violet-300 w-auto px-4 py-0 mt-3"
            >
              Login
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div
            className="flex items-center justify-between px-[10px] rounded-[10px] h-[37px] bg-[#52495e] cursor-pointer"
            onClick={() => openModal(MODAL_NAME.USERS_ONLINE_GAME)}
          >
            <div className="flex">
              {/* {Object.keys(usersInRoom).length > 0 && usersInRoom?.rows ? (
                usersInRoom.rows.slice(0, 3).map((user) => {
                  return (
                    <ImageLoading
                      key={user.id}
                      alt="user"
                      src={user?.avatar?.url ?? "/avatar-1.svg"}
                      className="first:m-0 w-8 h-8 mr-[-10px] rounded-full"
                    />
                  );
                })
              ) : (
                <Image alt="user" src={ava} className="w-[22px] mr-[-10px]" />
              )} */}
            </div>
            {/* {usersInRoom?.count && usersInRoom?.count > 3 && (
              <p className="text-[12px]">
                + {usersInRoom?.count && usersInRoom.count - 3} more
              </p>
            )} */}
          </div>
          <div className="text-[10px] h-[245px] pl-[10px] pr-[3px]">
            <div
              className="overflow-y-auto h-full flex flex-col"
              ref={boxChatWrapperRef}
            >
              {/* event */}
              <div className="all-mess" ref={boxChatRef}>
                {messages?.map((msg, i) => (
                  <MessageItem key={i} msg={msg} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

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
            className="bg-transparent text-base w-[90%] border-b-[1px] border-b-[#00000033] focus:border-b-white"
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

const MessageItem = ({ msg }) => {
  const { userInfo } = useAuthContext();
  return (
    <div>
      <div
        className={`w-full flex ${
          !msg.is_message
            ? "justify-center"
            : Number(userInfo?.id) === msg.user_id
            ? "justify-end pr-1"
            : "justify-start"
        }`}
      >
        <div
          className={`flex flex-col my-[3px] ${
            Number(userInfo?.id) === msg.user_id ? "items-end" : "items-start"
          }`}
        >
          {msg.is_message && (
            <Link
              href={dynamicPaths.achievements_by_username(msg?.user?.username)}
            >
              <div
                className={`flex items-center text-[#ffffff80] mb-[2px] gap-1 ${
                  Number(userInfo?.id) === msg.user_id ? "flex-row-reverse" : ""
                }`}
              >
                {msg?.user?.avatar ? (
                  <ImageLoading
                    alt=""
                    src={msg?.user?.avatar}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <Image
                    src="/avatar-1.svg"
                    alt="Image default"
                    width="16"
                    height="16"
                    className="w-8 h-8 rounded-full"
                  />
                )}

                <div className="w-fit max-w-[150px] break-words text-sm">
                  {msg?.user?.username}
                </div>
              </div>
            </Link>
          )}
          <div
            className={`rounded-md max-w-[150px] w-fit items-end ${
              !msg.is_message
                ? "text-[#fff] text-[12px] max-w-full"
                : Number(userInfo?.id) === msg.user_id
                ? "bg-[#EC4899] p-1 rounded-br-none text-base"
                : "bg-[#8B5CF6] p-1 rounded-tl-none text-base"
            }`}
          >
            {!msg.is_message
              ? Number(userInfo?.id) === msg.user_id
                ? (msg?.message).replace(`Player ${msg.user.username}`, "You")
                : msg?.message
              : msg?.message}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(BoxChat);
