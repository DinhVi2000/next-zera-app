import React, { useEffect, useRef, useState } from "react";
import GameScreenBar from "./GameScreenBar";

const GameScreen = ({ thumbnail, play_url, title }) => {
  const game_screen_ref = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  // handle zoom out
  const handleToggleZoomOutGameScreen = () => {
    setIsFullScreen(false);
    const gameScreenClassList = game_screen_ref.current?.classList;

    if (gameScreenClassList?.contains("full-screen")) {
      gameScreenClassList.remove("full-screen");
      // document
      //   ?.exitFullscreen()
      //   .then(() => {})
      //   .catch((e) => {});
    }
  };

  // handle zoom in
  const handleToggleZoomInGameScreen = () => {
    setIsFullScreen(true);
    const gameScreenClassList = game_screen_ref.current?.classList;

    gameScreenClassList?.add("full-screen");
    // document.requestFullscreen();
  };

  // handle zoom out
  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e?.keyCode === 27) handleToggleZoomOutGameScreen();
    });
  }, []);

  return (
    <div
      style={{
        gridArea: "gs / gs / gs / gs",
      }}
      className="h-full flex flex-col bg-white transition-all"
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
        title={title}
        thumbnail={thumbnail}
        isFullScreen={isFullScreen}
        onZoomInGameScreen={handleToggleZoomInGameScreen}
        onZoomOutGameScreen={handleToggleZoomOutGameScreen}
      />
    </div>
  );
};

export default GameScreen;
