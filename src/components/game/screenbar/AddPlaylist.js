import { useAuthContext } from "@/context/auth-context";
import { IconPlusNoRounded } from "@/resources/icons";
import { notifyErrorMessage } from "@/utils/helper";
import { Tooltip, useToast } from "@chakra-ui/react";
import React from "react";
import { MODAL_NAME } from "@/utils/constant";
import { useModalContext } from "@/context/modal-context";

function AddPlaylist() {
  const toast = useToast();
  const { openModal } = useModalContext();
  const { userInfo } = useAuthContext();

  const handlePlaylistGame = async () => {
    try {
      if (!userInfo) {
        openModal(MODAL_NAME.CONFIRM);
        return;
      }

      openModal(MODAL_NAME.PLAYLIST);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  return (
    <Tooltip label="Playlist" placement="bottom">
      <div className="flex-center w-10">
        <IconPlusNoRounded
          className={`cursor-pointer transition-all duration-150 w-8 h-8 active:scale-90 text-[#929292]`}
          onClick={handlePlaylistGame}
        />
      </div>
    </Tooltip>
  );
}

export default AddPlaylist;
