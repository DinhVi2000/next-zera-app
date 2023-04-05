/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { IconZoomIn, IconZoomOut } from "@/resources/icons";
import React, { useEffect, useRef, useState } from "react";
import ImageLoading from "@/components/loading/ImageLoading";
import { getArea } from "@/utils/helper";
import { useSelector } from "react-redux";

import AddPlaylist from "./screenbar/AddPlaylist";
import AddLove from "./screenbar/AddLove";
import { Tooltip } from "@chakra-ui/react";
import Report from "./screenbar/Report";
import { MODAL_NAME } from "@/utils/constant";
import { useModalContext } from "@/context/modal-context";
import { useAuthContext } from "@/context/auth-context";
import { getTimeRemaining } from "@/utils/common";
import { useSocketContext } from "@/context/socket-context";

const GameScreenBar = ({
  area,
  title,
  thumbnail,
  onZoomInGameScreen,
  onZoomOutGameScreen,
  isFullScreen,
  className,
  ...props
}) => {
  const { openModal } = useModalContext();
  const { userInfo } = useAuthContext();
  const { isCountdown } = useSocketContext();

  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const [remainingTime, setRemainingTime] = useState(getTimeRemaining(0));

  const timeInterval = useRef();
  const timeIncrease = useRef(0);

  const handleOpenReport = () => {
    if (!userInfo) {
      openModal(MODAL_NAME.CONFIRM);
      return;
    }
  };

  useEffect(() => {
    if (!isCountdown) return;

    timeInterval.current = setInterval(() => {
      if (userInfo?.playtime - timeIncrease.current === 0) {
        return clearInterval(timeInterval.current);
      }

      timeIncrease.current += 1;
      const time = getTimeRemaining(timeIncrease.current);
      setRemainingTime(time);
    }, 1000);
  }, [isCountdown]);

  return (
    <div
      style={{ gridArea: getArea(area) }}
      className={`${className} bg-[#373737] text-white py-2.5 pl-2.5 pr-5 flex items-center justify-between `}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <ImageLoading
          src={thumbnail}
          alt=""
          className="w-[50px] h-[50px] rounded-xl object-cover mb-hidden"
        />
        <div className="flex-1">{title}</div>
      </div>

      <div className="flex gap-5 justify-between max-[550px]:w-full">
        <div className="bg-[#5B5B5B] rounded-[10px] py-[5px] px-2.5 text-base">
          {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
        </div>

        <div className="flex gap-2.5 items-center">
          {info?.id ? (
            <>
              <Tooltip label="Love Game" placement="bottom">
                <div>
                  <AddLove />
                </div>
              </Tooltip>
              <Tooltip label="Playlist" placement="bottom">
                <div>
                  <AddPlaylist />
                </div>
              </Tooltip>
            </>
          ) : (
            <>
              <div className="skeleton-shine w-7 h-7 rounded-lg"></div>
              <div className="skeleton-shine w-7 h-7 rounded-lg"></div>
            </>
          )}
          <Tooltip
            label={isFullScreen ? "Zoom in" : "Zoom out"}
            placement="bottom"
          >
            <span
              className="h-fit mb-hidden"
              onClick={isFullScreen ? onZoomOutGameScreen : onZoomInGameScreen}
            >
              {isFullScreen ? (
                <IconZoomOut className="cursor-pointer w-7 h-7 text-[#929292]" />
              ) : (
                <IconZoomIn className="cursor-pointer w-8 h-8 text-[#929292]" />
              )}
            </span>
          </Tooltip>
          <Tooltip label="Report" placement="bottom">
            <div onClick={handleOpenReport}>
              <Report />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default GameScreenBar;
