import { useAuthContext } from "@/context/auth-context";
import { IconPlusNoRounded } from "@/resources/icons";
import { addGamePlaylist } from "@/services/game.service";
import { notifyErrorMessage, notifySuccessMessage } from "@/utils/helper";
import { Tooltip, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import ButtonLoading from "../../loading/ButtonLoading";
import { useModalContext } from "@/context/modal-context";

function AddPlaylist() {
  const toast = useToast();
  const { openModal } = useModalContext();
  const { userInfo } = useAuthContext();
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const [isPlaylist, setIsPlaylist] = useState();
  const [status, setStatus] = useState(STATUS.SUCCESS);

  const handlePlaylistGame = async () => {
    try {
      if (!userInfo) {
        openModal(MODAL_NAME.CONFIRM);
        return;
      }
      setStatus(STATUS.NOT_START);
      const gameId = { game_detail_id: info?.id };
      const { data } = await addGamePlaylist(gameId);

      if (data) {
        setIsPlaylist(true);
        notifySuccessMessage(toast, "Successfully added to the Love Games!");
      } else {
        setIsPlaylist(false);
        notifySuccessMessage(
          toast,
          "Successfully removed from the Love Games!"
        );
      }

      setStatus(STATUS.SUCCESS);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    if (userInfo?.playlist && info?.id) {
      setIsPlaylist(!!userInfo?.playlist?.find((e) => e?.id == info?.id));
    }
  }, [info]);

  return (
    <Tooltip label="Playlist" placement="bottom">
      <div className="flex-center w-10">
        {status === STATUS.SUCCESS ? (
          <IconPlusNoRounded
            className={`cursor-pointer transition-all duration-150 w-8 h-8 active:scale-90 ${
              isPlaylist ? "text-[#009834]" : "text-[#929292]"
            }`}
            onClick={handlePlaylistGame}
          />
        ) : (
          <ButtonLoading isLoading disabled={status === STATUS.NOT_START} />
        )}
      </div>
    </Tooltip>
  );
}

export default AddPlaylist;
