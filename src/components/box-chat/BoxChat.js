/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, memo, useEffect, Fragment } from "react";

import { IconEmoji, IconSendMes } from "@/resources/icons";
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
import EmojiPicker from "emoji-picker-react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { EmojiText } from "./EmojiText";

const MAX_MESSAGE_SEND = 5;
const MAX_LENGTH = 50;
const TIME_LIMIT = 60;

function BoxChat({ area }) {
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};
  const { get } = useApi();

  const toast = useToast();

  const [messages, setMessages] = useState([]);
  const [inputStr, setInputStr] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [messageSentCount, setSentMessageCount] = useState(0);

  const timeSendFirstMessage = useRef();
  const inputRef = useRef();
  const boxChatRef = useRef();
  const messagesRef = useRef();
  const emojiRef = useRef();
  const emojiButtonRef = useRef();

  const { userInfo, token, verifyStatus } = useAuthContext();
  const { openModal, setPayload, payload } = useModalContext();
  const {
    socketCLI,
    sendMessageStatus,
    setSendMessageStatus,
    systemMessage,
    newMessage,
  } = useSocketContext();

  const handleSendMessage = (e) => {
    e.preventDefault();

    var msg = "";
    var words = inputRef.current.value;
    words = words.split(" ");

    for (const i in words) {
      for (const j in EmojiText) {
        if (j == words[i]) {
          words[i] = EmojiText[j];
        }
      }

      var messageStr = (msg += words[i] + " ");
    }

    if (inputRef.current?.value?.length > MAX_LENGTH) {
      return notifyErrorMessage(toast, {
        message: `No longer than ${MAX_LENGTH} characters`,
      });
    }

    if (messageSentCount === MAX_MESSAGE_SEND) {
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

    setInputStr("");
    if (!inputRef.current.value.trim()) return;
    socketCLI.emit(SOCKET_EVENT.SEND_MESSAGE, { msg: messageStr });
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
    });
  }, []);

  useEffect(() => {
    if (messageSentCount === 1) timeSendFirstMessage.current = moment.now();
  }, [messageSentCount]);

  const onEmojiClick = (e) => {
    setInputStr((preInput) => preInput + e.emoji);
  };

  const handleClickOutside = (e) => {
    if (emojiButtonRef?.current?.contains(e?.target)) return;
    setOpenEmoji(false);
  };

  useOnClickOutside(emojiRef, (e) => handleClickOutside(e));

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
              {payload?.users?.length > 0 &&
                payload?.users?.slice(0, 5).map((user, i) => {
                  return (
                    <ImageLoading
                      key={i}
                      alt="user"
                      src={user?.avatar ?? DEFAULT_AVATAR_SRC}
                      className={`first:m-0 w-8 h-8 mr-[-10px] rounded-full ${
                        i !== 0 && "translate-x-[-10px]"
                      }`}
                    />
                  );
                })}
            </div>
            {payload?.users?.count > 5 && (
              <p className="text-[12px]">+ {payload?.users?.count - 5} more</p>
            )}
          </header>
          <section className="text-[10px] h-[233px] pl-[10px] pr-[3px] py-2">
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
        <div className="flex items-center justify-between px-[20px] rounded-[10px] h-[37px] bg-[#52495e] relative">
          <input
            ref={inputRef}
            disabled={!userInfo}
            placeholder="Say something..."
            className="bg-transparent text-base w-[90%] border-b-[1px] border-b-[#00000033] focus:border-b-white"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
          />

          <button
            disabled={!userInfo}
            onClick={() => setOpenEmoji((value) => !value)}
            ref={emojiButtonRef}
          >
            <IconEmoji className="w-4 h-4 cursor-pointer mx-3" />
          </button>

          {openEmoji && (
            <div ref={emojiRef}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          <button type="submit" disabled={!userInfo}>
            <IconSendMes className="w-4 h-4 cursor-pointer" />
          </button>
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
  const isOfOnePerson = !prevMsg?.is_message
    ? false
    : msg?.user_id === prevMsg?.user_id
    ? true
    : false;

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
        <div className="text-sm bg-pink-500 rounded-xl py-1 px-2 break-all">
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
          <div className="text-sm bg-violet-500 rounded-xl py-1 px-2 break-all">
            {msg?.message}
          </div>
        </div>
      </div>
    ),
  };

  return <Fragment>{MESSAGE_NODE[messageType(msg, userInfo)]}</Fragment>;
};
export default memo(BoxChat);
