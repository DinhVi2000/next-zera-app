/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { IconHeart } from "@/resources/icons";
import { useAuthContext } from "@/context/auth-context";
import { useSelector } from "react-redux";

import { addGameLove } from "@/services/game.service";

import { Tooltip, useToast } from "@chakra-ui/react";
import { notifyErrorMessage, notifySuccessMessage } from "@/utils/helper";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import ButtonLoading from "../../loading/ButtonLoading";
import { useModalContext } from "@/context/modal-context";

function AddLove() {
  const toast = useToast();
  const { openModal } = useModalContext();
  const { userInfo } = useAuthContext();
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const [isLoved, setIsLoved] = useState();
  const [status, setStatus] = useState(STATUS.SUCCESS);

  const handleLoveGame = async () => {
    try {
      if (!userInfo) {
        openModal(MODAL_NAME.CONFIRM);
        return;
      }
      setStatus(STATUS.NOT_START);
      const gameId = { game_detail_id: info?.id };
      const { data } = await addGameLove(gameId);

      if (data) {
        setIsLoved(true);
        notifySuccessMessage(toast, "Successfully added to the Love Games!");
      } else {
        setIsLoved(false);
        notifySuccessMessage(
          toast,
          "Successfully removed from the Love Games!"
        );
      }

      setStatus(STATUS.SUCCESS);
    } catch (e) {
      setStatus(STATUS.SUCCESS);
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    if (userInfo?.loved && info?.id) {
      setIsLoved(!!userInfo?.loved?.find((e) => e?.id === info?.id));
    }
  }, [info]);

  return (
    <Tooltip label="Love Game" placement="bottom">
      <div className="flex-center w-10">
        {status === STATUS.SUCCESS ? (
          <IconHeart
            className={`cursor-pointer transition-all duration-150 w-8 h-8 active:scale-90 ${
              isLoved ? "text-[#fd384f]" : "text-[#929292]"
            }`}
            onClick={handleLoveGame}
          />
        ) : (
          <ButtonLoading isLoading disabled={status === STATUS.NOT_START} />
        )}
      </div>
    </Tooltip>
  );
}

export default AddLove;
