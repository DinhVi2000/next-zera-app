/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, memo, useEffect } from "react";
import moment from "moment";
import Image from "next/image";

import ava from "@/../public/images/ava1.png";
import { IconSendMes } from "@/resources/icons";
import { useAuthContext } from "@/context/auth-context";
import { getArea } from "@/utils/helper";
import { useSocketContext } from "@/context/socket-context";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "@/services/game.service";
import ImageLoading from "../loading/ImageLoading";
import Link from "next/link";
import { MAX_LIMIT_MESSAGE, MESSAGE_MAX_LENGTH, MODAL_NAME } from "@/utils/constant";
import { useModalContext } from "@/context/modal-context";
import { useToast } from "@chakra-ui/react";
import { notifyErrorMessage } from "@/utils/helper";
import { staticPaths } from "@/utils/$path";

function BoxChat({ area }) {
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [limitChat, setLimitChat] = useState({
    lastTime: moment().startOf('minute').minutes(),
    limitMessage: 0,
  });
  const roomCurrent = info?.id || 0;
  const inputRef = useRef();
  const refScroll = useRef();
  const refBoxChat = useRef();
  const { userInfo, anonymousInfo } = useAuthContext();
  const { openModal } = useModalContext();
  const {
    isCountDown,
    setIsCountDown,
    socketClient,
    sendMessage,
    joinRoom,
    messageSocket,
    playGame,
    stopGame,
    leaveGame,
    listenAllEvent,
    showModalBuyTime,
    usersInRoom,
    setIncrementTime,
  } = useSocketContext();
  const toast = useToast();
  const handleSendMessage = (e) => {
    e.preventDefault();
    const minuteNow = moment().startOf('minute').minutes();
    if (!inputRef.current.value.trim()) {
      notifyErrorMessage(toast, {
        message: "Please enter message before send!",
      });
      return;
    }
    if (inputRef.current.value.trim().length > MESSAGE_MAX_LENGTH) {
      notifyErrorMessage(toast, {
        message: `Please enter message with length less than ${MESSAGE_MAX_LENGTH} character`,
      });
      return;
    }
    if (limitChat.lastTime === minuteNow) {
      if (limitChat.limitMessage === MAX_LIMIT_MESSAGE) {
        notifyErrorMessage(toast, {
          message: 'You have exceeded the limit of messages sent in 1 minute',
        });
        return;
      }
    } else {
      setLimitChat({ lastTime: minuteNow, limitMessage: 0 });
    }
    sendMessage({
      socket_id: socketClient.id,
      msg: inputRef.current.value,
      user_id: !userInfo ? anonymousInfo?.uid : Number(userInfo?.id),
      room_id: roomCurrent,
      is_anonymous: !userInfo,
    });
    setLimitChat(prev => ({ lastTime: minuteNow, limitMessage: prev.limitMessage + 1 }));
    e.target.reset();
  };

  useEffect(() => {
    listenAllEvent();
  }, []);
  // Get all message of game
  useEffect(() => {
    const fetchMessages = async () => {
      const listMes = await getMessages(dispatch, info?.id);
      setMessages(listMes);
    };
    if (info?.id) {
      fetchMessages();
    }
  }, [info]);

  useEffect(() => {
    if (!messageSocket) return;
    setMessages((oldMes) => [...oldMes].concat(messageSocket));
  }, [messageSocket]);

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
      setIncrementTime(0);
      setIsCountDown(false);
      leaveGame({
        user_id: !userInfo ? anonymousInfo?.uid : Number(userInfo?.id),
        room_id: roomCurrent,
        is_anonymous: !userInfo ? true : false,
      });
    };
  }, []);
  useEffect(() => {
    showModalBuyTime
      ? openModal(MODAL_NAME.BUYTIME)
      : openModal(MODAL_NAME.NONE);
  }, [showModalBuyTime]);
  // Scroll to Bottom
  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = refBoxChat.current.offsetHeight;
    }
  }, [refScroll.current, messageSocket, messages]);

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
              {
                Object.keys(usersInRoom).length > 0 && usersInRoom?.rows ? usersInRoom.rows.slice(0, 3).map((user) => {
                  return <ImageLoading key={user.id} alt="user" src={user?.avatar ?? '/avatar-1.svg'} className="first:m-0 w-5 h-5 mr-[-10px]  rounded-full" />;
                }) : <Image alt="user" src={ava} className="w-[22px] mr-[-10px]" />
              }
            </div>
            {usersInRoom?.count && usersInRoom?.count > 3 && (
              <p className="text-[12px]">
                + {usersInRoom?.count && usersInRoom.count - 3} more
              </p>
            )}
          </div>
          <div className="text-[10px] h-[245px] pl-[10px] pr-[3px]">
            <div
              className="overflow-y-auto h-full flex flex-col"
              ref={refScroll}
            >
              {/* Event */}
              <div className="all-mess" ref={refBoxChat}>
                {messages &&
                  messages?.map((msg, i) => {
                    return <MessageItem key={i} msg={msg} />;
                  })}
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

const MessageItem = ({ msg }) => {
  const { userInfo } = useAuthContext();
  return (
    <div>
      <div
        className={`w-full flex ${!msg.is_message ? "justify-center" : (Number(userInfo?.id) === msg.user_id ? "justify-end pr-1" : "justify-start")}`}
      >
        <div className={ `flex flex-col my-[3px] ${(Number(userInfo?.id) === msg.user_id ? "items-end" : "items-start") }`} >
          {
            msg.is_message &&
            (<div className={`flex items-center text-[#ffffff80] mb-[2px] gap-1 ${ (Number(userInfo?.id) === msg.user_id ? "flex-row-reverse" : "") }`}>
                {
                  msg?.user?.avatar ? <ImageLoading
                    alt=""
                    src={msg?.user?.avatar}
                    className="w-4 h-4 rounded-full"
                    /> : <Image src="/avatar-1.svg" alt="Image default" width="16" height="16" className="w-4 h-4 rounded-full" />
                }
                <div className="w-fit max-w-[150px] break-words">
                  {msg?.user?.username}
                </div>
              </div>)
          }
          <div className={ `rounded-md max-w-[150px] w-fit items-end ${ !msg.is_message ? "text-[#fff] text-[10px] max-w-full" : (Number(userInfo?.id) === msg.user_id ? "bg-[#EC4899] p-1 rounded-br-none" : "bg-[#8B5CF6] p-1 rounded-tl-none") }`}>
            {
              !msg.is_message ? (Number(userInfo?.id) === msg.user_id ? (msg?.message).replace(`Player ${msg.user.username}`, 'You') : msg?.message) : msg?.message
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(BoxChat);
