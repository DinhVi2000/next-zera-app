/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, memo, useEffect, Fragment } from "react";
import moment from "moment";
import Image from "next/image";

import { IconSendMes } from "@/resources/icons";
import { useAuthContext } from "@/context/auth-context";
import { getArea, sleep } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import ImageLoading from "../loading/ImageLoading";
import Link from "next/link";
import {
  DEFAULT_AVATAR_SRC,
  MODAL_NAME,
  SOCKET_EVENT,
  STATUS,
} from "@/utils/constant";
import { useModalContext } from "@/context/modal-context";
import { dynamicPaths, staticPaths } from "@/utils/$path";
import { useSocketContext } from "@/context/socket-context";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";

function BoxChat({ area }) {
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};
  const { get } = useApi();

  const [messages, setMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState();
  // const [limitChat, setLimitChat] = useState({
  //   lastTime: moment().startOf("minute").minutes(),
  //   limitMessage: 0,
  // });

  const inputRef = useRef();
  const boxChatRef = useRef();
  const messagesRef = useRef();

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
      inputRef.current.value = "";

      // scroll to Bottom
      if (boxChatRef.current) {
        boxChatRef.current.scrollTo({
          top: messagesRef.current.offsetHeight,
          behavior: "smooth",
        });
      }
    }
  }, [sendMessageStatus, newMessage]);

  // add new message
  useEffect(() => {
    if (systemMessage) setMessages((prev) => [...prev, systemMessage]);
  }, [systemMessage]);

  useEffect(() => {
    if (messages) {
      boxChatRef.current?.scrollTo({
        top: messagesRef.current?.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    socketCLI.on(SOCKET_EVENT.LIST_USERS_JOIN_ROOM, (data) =>
      setUsersInRoom(Object.values(data?.users || {}))
    );
    return () => {};
  }, []);

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
          {/* header  */}
          <header
            className="flex items-center justify-between px-2 py-[6px] rounded-[10px] min-h-[44px] bg-[#52495e] cursor-pointer"
            onClick={() => openModal(MODAL_NAME.USERS_ONLINE_GAME)}
          >
            <div className="flex">
              {usersInRoom?.length > 0 &&
                usersInRoom?.slice(0, 5).map((user, i) => {
                  return (
                    <ImageLoading
                      key={user.id}
                      alt="user"
                      src={user?.avatar?.url ?? DEFAULT_AVATAR_SRC}
                      className={`first:m-0 w-8 h-8 mr-[-10px] rounded-full ${
                        i !== 0 && "translate-x-[-50%]"
                      }`}
                    />
                  );
                })}
            </div>
            {usersInRoom?.count > 5 && (
              <p className="text-[12px]">+ {usersInRoom?.count - 5} more</p>
            )}
          </header>
          <section className="text-[10px] h-[233px] pl-[10px] pr-[3px]">
            <div
              className="overflow-y-auto overflow-x-hidden h-full flex flex-col"
              ref={boxChatRef}
            >
              {/* event */}
              <div ref={messagesRef}>
                {messages?.map((msg, i) => (
                  <MessageItem key={i} msg={msg} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <form onSubmit={(e) => handleSendMessage(e)}>
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
          <div
            className={`flex items-center text-[#ffffff80] mb-[2px] gap-1 ${
              Number(userInfo?.id) === msg.user_id && "flex-row-reverse"
            }`}
          >
            {userInfo?.id !== msg.user_id && (
              <Fragment>
                {/* avatar */}
                <ImageLoading
                  alt=""
                  src={msg?.user?.avatar || DEFAULT_AVATAR_SRC}
                  className="w-8 h-8 rounded-full"
                />
                {/* username */}
                <div className="text-ellipsis overflow-hidden whitespace-nowrap w-fit max-w-[290px] break-words text-sm">
                  {msg?.user?.username}
                </div>
              </Fragment>
            )}
          </div>
        )}
        <div
          className={`rounded-md max-w-[150px] w-fit items-end ${
            !msg.is_message
              ? "text-[#fff] text-[12px] max-w-full"
              : Number(userInfo?.id) === msg.user_id
              ? "bg-[#EC4899] py-1 px-2 rounded-xl text-base"
              : "bg-[#8B5CF6] py-1 px-2 rounded-xl text-base"
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
  );
};
export default memo(BoxChat);
