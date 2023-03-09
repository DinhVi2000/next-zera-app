/* eslint-disable @next/next/no-img-element */
import { IconInfo, IconZoomIn, IconZoomOut } from "@/resources/icons";
import React from "react";
import ImageLoading from "@/components/loading/ImageLoading";
import { getArea } from "@/utils/helper";
import { useSelector } from "react-redux";

import AddPlaylist from "./screenbar/AddPlaylist";
import AddLove from "./screenbar/AddLove";
import { Tooltip } from "@chakra-ui/react";

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
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  return (
    <div
      style={{ gridArea: getArea(area) }}
      className={`${className} bg-[#373737] text-white py-2.5 px-5 flex items-center justify-between `}
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
          00 : 00 : 00
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
            label={isFullScreen ? "Zoom out" : "Zoom in"}
            placement="bottom"
          >
            <span
              className="h-fit mb-hidden"
              onClick={isFullScreen ? onZoomOutGameScreen : onZoomInGameScreen}
            >
              {isFullScreen ? (
                //   <div>
                <IconZoomOut className="cursor-pointer w-7 h-7 text-[#929292]" />
              ) : (
                //   </div>
                // </Tooltip>
                // <Tooltip label="Zoom out" placement="bottom">
                //   <div>
                <IconZoomIn className="cursor-pointer w-8 h-8 text-[#929292]" />
                //   </div>
              )}
            </span>
          </Tooltip>
          <Tooltip label="Report" placement="bottom">
            <div>
              <IconInfo className="cursor-pointer" />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default GameScreenBar;
