/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, memo, useEffect, Fragment } from "react";

import { IconSendMes } from "@/resources/icons";
import { useAuthContext } from "@/context/auth-context";
import { getArea, notifyErrorMessage } from "@/utils/helper";
import { useSelector } from "react-redux";
import ImageLoading from "../loading/ImageLoading";
import Link from "next/link";
import {
  DEFAULT_AVATAR_SRC,
  MESSAGE_TYPE,
  MODAL_NAME,
  SOCKET_EVENT,
  STATUS,
} from "@/utils/constant";
import { useModalContext } from "@/context/modal-context";
import { staticPaths } from "@/utils/$path";
import { useSocketContext } from "@/context/socket-context";
import { useApi } from "@/hooks/useApi";
import { apiURL } from "@/utils/$apiUrl";
import moment from "moment";
import { useToast } from "@chakra-ui/react";

const MAX_MESSAGE_SEND = 5;
const TIME_LIMIT = 60;

function BoxChat({ area }) {
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};
  const { get } = useApi();

  const toast = useToast();

  const [messages, setMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState();
  // const [limitChat, setLimitChat] = useState({
  //   lastTime: moment().startOf("minute").minutes(),
  //   limitMessage: 0,
  // });
  const [messageSentCount, setSentMessageCount] = useState(0);

  const timeSendFirstMessage = useRef();
  const inputRef = useRef();
  const boxChatRef = useRef();
  const messagesRef = useRef();

  const { userInfo, token, verifyStatus } = useAuthContext();
  const { openModal, setPayload } = useModalContext();
  const {
    socketCLI,
    sendMessageStatus,
    setSendMessageStatus,
    systemMessage,
    newMessage,
  } = useSocketContext();

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageSentCount === MAX_MESSAGE_SEND) {
      // s
      const timeRange = (moment.now() - timeSendFirstMessage.current) / 1000;

      if (timeRange < TIME_LIMIT) {
        return notifyErrorMessage(toast, {
          message: `Send too many message please try again after ${Math.round(
            TIME_LIMIT - timeRange
          )} s`,
        });
      }

      setSentMessageCount(0);
      timeSendFirstMessage.current = null;
    }

    if (!inputRef.current.value.trim()) return;
    socketCLI.emit(SOCKET_EVENT.SEND_MESSAGE, { msg: inputRef.current.value });
    setSendMessageStatus(STATUS.IN_PROGRESS);
  };

  // join room
  useEffect(() => {
    if (!socketCLI || verifyStatus !== STATUS.SUCCESS || !info) return;
    socketCLI.emit(SOCKET_EVENT.USER_JOIN_ROOM, { room_id: info.id, token });
  }, [socketCLI, verifyStatus, info]);

  // get messages
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
      setSentMessageCount((prev) => prev + 1);
      inputRef.current.value = "";

      // scroll to bottom
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

  // scroll when messages change
  useEffect(() => {
    if (messages) {
      boxChatRef.current?.scrollTo({
        top: messagesRef.current?.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // get users online
  useEffect(() => {
    socketCLI.on(SOCKET_EVENT.LIST_USERS_JOIN_ROOM, (data) => {
      setPayload(data);
      setUsersInRoom(Object.values(data?.users || {}));
    });
  }, []);

  useEffect(() => {
    if (messageSentCount === 1) timeSendFirstMessage.current = moment.now();
  }, [messageSentCount]);

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
                      key={i}
                      alt="user"
                      src={user?.avatar?.url ?? DEFAULT_AVATAR_SRC}
                      className={`first:m-0 w-8 h-8 mr-[-10px] rounded-full ${
                        i !== 0 && "translate-x-[-10px]"
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
              <div ref={messagesRef} className="px-1">
                {messages?.map((msg, i) => (
                  <MessageItem
                    key={i}
                    msg={msg}
                    prevMsg={i > 0 && messages[i - 1]}
                  />
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

const messageType = (msg, userInfo) => {
  if (!msg?.is_message) return MESSAGE_TYPE.SYSTEM_MESSAGE;
  if (msg?.is_message && Number(userInfo?.id) === msg.user_id) {
    return MESSAGE_TYPE.MY_MESSAGE;
  }
  return MESSAGE_TYPE.USER_MESSAGE;
};

const MessageItem = ({ msg, prevMsg }) => {
  const { userInfo } = useAuthContext();

  const isOfOnePerson = msg?.is_message && msg?.user_id === prevMsg?.user_id;

  const MESSAGE_NODE = {
    SYSTEM_MESSAGE: (
      <p className="text-center text-xs py-2">
        {msg?.user_id === userInfo.id
          ? msg.message.replace(`Player ${userInfo?.username}`, "You")
          : msg.message}
      </p>
    ),
    MY_MESSAGE: (
      <div className="flex justify-end mb-1">
        <div className="text-sm bg-pink-500 rounded-xl py-1 px-2">
          {msg?.message}
        </div>
      </div>
    ),
    USER_MESSAGE: (
      <div>
        {/* avatar, username */}
        {!isOfOnePerson && (
          <header className="flex items-center gap-2 mb-2">
            <ImageLoading
              alt=""
              src={msg?.user?.avatar || DEFAULT_AVATAR_SRC}
              className="w-8 h-8 rounded-full"
            />
            {/* username */}
            <div className="text-ellipsis text-[#ffffff80] overflow-hidden whitespace-nowrap w-fit max-w-[290px] break-words text-sm">
              {msg?.user?.username}
            </div>
          </header>
        )}
        {/* message */}
        <div className="flex justify-start mb-1">
          <div className="text-sm bg-violet-500 rounded-xl py-1 px-2">
            {msg?.message}
          </div>
        </div>
      </div>
    ),
  };

  return <Fragment>{MESSAGE_NODE[messageType(msg, userInfo)]}</Fragment>;
};
export default memo(BoxChat);
