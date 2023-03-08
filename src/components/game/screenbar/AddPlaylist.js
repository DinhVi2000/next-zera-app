import { useAuthContext } from "@/context/auth-context";
import { IconPlusNoRounded } from "@/resources/icons";
import { addGamePlaylist } from "@/services/game.service";
import { getUserInfo } from "@/services/user.service";
import { notifyErrorMessage, notifySuccessMessage } from "@/utils/helper";
import { Tooltip, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AddPlaylist() {
  const toast = useToast();
  const { userInfo, usernameAuth, setUserInfo } = useAuthContext();
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const [isPlaylist, setIsPlaylist] = useState();

  const checkIsPlaylist = () => {
    if (userInfo?.playlist?.includes(info?.id)) {
      setIsPlaylist(false);
      notifySuccessMessage(toast, "Successfully removed from the Playlist!");
    } else {
      setIsPlaylist(true);
      notifySuccessMessage(toast, "Successfully added to the Playlist!");
    }
  };

  const handlePlaylistGame = async () => {
    try {
      const gameId = { game_detail_id: info?.id };
      const { data } = await addGamePlaylist(gameId);
      if (!data) return;

      const res = await getUserInfo(usernameAuth);
      setUserInfo(res?.data);

      if (userInfo) {
        checkIsPlaylist();
      }
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    if (userInfo?.playlist && info?.id) {
      setIsPlaylist(userInfo?.playlist?.includes(info?.id));
    }
  }, [info]);

  return (
    <Tooltip label="Playlist" placement="bottom">
      <div>
        <IconPlusNoRounded
          className={`cursor-pointer transition-all duration-150 w-8 h-8 active:scale-90 ${
            isPlaylist ? "text-[#009834]" : "text-[#929292]"
          }`}
          onClick={handlePlaylistGame}
        />
      </div>
    </Tooltip>
  );
}

export default AddPlaylist;
