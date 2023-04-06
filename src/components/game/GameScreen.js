/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthContext } from "@/context/auth-context";
import { useSocketContext } from "@/context/socket-context";
import { IconBackXs, IconLogo, IconPlay } from "@/resources/icons";
import { MODAL_NAME, SOCKET_EVENT, STATUS } from "@/utils/constant";
import { getArea } from "@/utils/helper";
import React, { useEffect, useRef, useState } from "react";
import ImageLoading from "../loading/ImageLoading";
import GameScreenBar from "./GameScreenBar";
import { useModalContext } from "@/context/modal-context";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const GameScreen = ({ thumbnail, play_url, title }) => {
  const isMatchMobile = useMediaQuery("(max-width: 550px)");

  const game_screen_ref = useRef();
  const bg_mb_ref = useRef();
  const back_tab_mb_ref = useRef();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    socketCLI,
    setIsCountdown,
    setCountdownStatus,
    clearTimerInterval,
    countdownStatus,
    timeDecrease,
    timeInterval,
  } = useSocketContext();
  const { userInfo } = useAuthContext();
  const { openModal } = useModalContext();

  // handle zoom out
  const handleToggleZoomOutGameScreen = () => {
    setIsFullScreen(false);
    const gameScreenClassList = game_screen_ref.current?.classList;

    if (gameScreenClassList?.contains("full-screen")) {
      gameScreenClassList.remove("full-screen");
      gameScreenClassList.add("max-[550px]:rounded-2xl");
    }
    bg_mb_ref.current.classList.remove("hidden-imp");
    back_tab_mb_ref.current.classList.toggle("hidden-imp");
  };

  // handle zoom in
  const handleToggleZoomInGameScreen = () => {
    setIsFullScreen(true);

    bg_mb_ref.current.classList.toggle("hidden-imp");
    back_tab_mb_ref.current.classList.toggle("hidden-imp");
    game_screen_ref.current?.classList?.remove("max-[550px]:rounded-2xl");
    game_screen_ref.current?.classList?.add("full-screen");
    // document.requestFullscreen();
  };

  const handlePlayGame = () => {
    if (!socketCLI) return;
    socketCLI.emit(SOCKET_EVENT.PLAY_GAME);
    setIsPlaying(true);
    setIsCountdown(true);
  };

  const handleStopPlayGame = () => {
    if (!socketCLI) return;
    socketCLI.emit(SOCKET_EVENT.STOP_GAME);
    clearInterval(timeInterval.current);
    setIsPlaying(false);
    setIsCountdown(false);
    setCountdownStatus(STATUS.INIT);
    timeDecrease.current = 0;
  };

  // handle zoom out
  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e?.keyCode === 27) handleToggleZoomOutGameScreen();
    });
  }, []);

  // open modal buy time when playtime out
  useEffect(() => {
    if (countdownStatus === STATUS.IN_PROGRESS && +userInfo?.playtime <= 0) {
      if (isFullScreen) handleToggleZoomOutGameScreen();
      openModal(MODAL_NAME.BUYTIME);
    }
  }, [userInfo?.playtime, countdownStatus]);

  return (
    <div
      style={{
        gridArea: getArea("gs"),
      }}
      className={`h-full flex flex-col bg-white transition-all max-[550px]:rounded-2xl overflow-hidden relative`}
      ref={game_screen_ref}
    >
      <iframe
        className={`${!thumbnail && "skeleton-shine"} flex-1`}
        width="100%"
        frameBorder="0"
        marginHeight="0"
        vspace="0"
        hspace="0"
        scrolling="no"
        allowFullScreen={true}
        src={play_url}
      ></iframe>
      <GameScreenBar
        className={"mb-hidden"}
        title={title}
        thumbnail={thumbnail}
        isFullScreen={isFullScreen}
        onZoomInGameScreen={handleToggleZoomInGameScreen}
        onZoomOutGameScreen={handleToggleZoomOutGameScreen}
      />

      {/* show this when full screen */}

      {/* back tab  */}
      <div
        className="mb-flex hidden-imp items-center justify-center gap-2 bg-violet-200 rounded-r-2xl fixed top-6 w-[62px] h-[40px]"
        onClick={() => {
          handleToggleZoomOutGameScreen();
          handleStopPlayGame();
          clearTimerInterval();
        }}
        ref={back_tab_mb_ref}
      >
        <div className="text-violet-600">
          <IconBackXs className="w-2 h-3" />
        </div>

        <div>
          <IconLogo className="w-6 h-5" />
        </div>
      </div>
      {/* bg before play */}
      {!isMatchMobile && !isPlaying && (
        <div className="w-full h-full bg-blur-800 absolute top-0 flex-center">
          <button
            className="text-base text-white rounded-[20px] bg-linear-violet-300 py-3 px-10 w-[220px]
                        transition-all hover:scale-105"
            onClick={handlePlayGame}
          >
            Play
          </button>
        </div>
      )}
      {/* bg mb */}
      <div
        className="absolute w-full h-full mb-block bg_game-screen-mb"
        ref={bg_mb_ref}
      >
        <ImageLoading className="w-full h-full object-cover" src={thumbnail} />

        {/* play button */}
        <div
          className="bg-white flex-center w-16 h-16 rounded-full absolute-center z-10"
          onClick={() => {
            handleToggleZoomInGameScreen();
            handlePlayGame();
          }}
        >
          <IconPlay className="w-4 ml-1" />
        </div>
        <p className="absolute-center text-white text-lg font-bold mt-11 z-10">
          Play game
        </p>
      </div>
    </div>
  );
};

export default GameScreen;
