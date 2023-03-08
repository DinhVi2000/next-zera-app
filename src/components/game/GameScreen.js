import { useAuthContext } from "@/context/auth-context";
import { IconBack, IconBackXs, IconLogo, IconPlay } from "@/resources/icons";
import React, { useEffect, useRef, useState } from "react";
import ImageLoading from "../loading/ImageLoading";
import GameScreenBar from "./GameScreenBar";

const GameScreen = ({ thumbnail, play_url, title }) => {
  const game_screen_ref = useRef();
  const bg_mb_ref = useRef();
  const back_tab_mb_ref = useRef();
  const { setIsCountDown } = useAuthContext();

  const [isFullScreen, setIsFullScreen] = useState(false);

  // handle zoom out
  const handleToggleZoomOutGameScreen = () => {
    setIsFullScreen(false);
    const gameScreenClassList = game_screen_ref.current?.classList;

    if (gameScreenClassList?.contains("full-screen"))
      gameScreenClassList.remove("full-screen");
    bg_mb_ref.current.classList.remove("hidden-imp");
    back_tab_mb_ref.current.classList.toggle("hidden-imp");
  };

  // handle zoom in
  const handleToggleZoomInGameScreen = () => {
    setIsFullScreen(true);

    bg_mb_ref.current.classList.toggle("hidden-imp");
    back_tab_mb_ref.current.classList.toggle("hidden-imp");
    game_screen_ref.current?.classList?.add("full-screen");
    // document.requestFullscreen();
  };

  // handle zoom out
  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e?.keyCode === 27) handleToggleZoomOutGameScreen();
    });
  }, []);

  //handle stop/play game
  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY > game_screen_ref.current?.clientHeight) {
        setIsCountDown(false);
      } else {
        setIsCountDown(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        gridArea: "gs / gs / gs / gs",
      }}
      className="h-full flex flex-col bg-white transition-all rounded-2xl overflow-hidden relative"
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
        onClick={handleToggleZoomOutGameScreen}
        ref={back_tab_mb_ref}
      >
        <div className="text-violet-600">
          <IconBackXs className="w-2 h-3" />
        </div>

        <div>
          <IconLogo className="w-6 h-5" />
        </div>
      </div>

      {/* bg mb */}
      <div
        className="absolute w-full h-full mb-block bg_game-screen-mb"
        ref={bg_mb_ref}
      >
        <ImageLoading className="w-full h-full object-cover" src={thumbnail} />

        {/* play button */}
        <div
          className="bg-white flex-center w-16 h-16 rounded-full absolute-center z-10"
          onClick={handleToggleZoomInGameScreen}
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
