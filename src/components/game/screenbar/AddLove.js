import React, { useEffect, useState } from "react";

import { IconHeart } from "@/resources/icons";
import { useAuthContext } from "@/context/auth-context";
import { useSelector } from "react-redux";

import { addGameLove } from "@/services/game.service";
import { getUserInfo } from "@/services/user.service";

import { Tooltip, useToast } from "@chakra-ui/react";
import { notifyErrorMessage, notifySuccessMessage } from "@/utils/helper";

function AddLove() {
  const toast = useToast();
  const { userInfo, usernameAuth, setUserInfo } = useAuthContext();
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const [isLoved, setIsLoved] = useState();

  const checkIsLoved = () => {
    if (userInfo?.lovedGame?.includes(info?.id)) {
      setIsLoved(false);
      notifySuccessMessage(toast, "Successfully removed from the Love Games!");
    } else {
      setIsLoved(true);
      notifySuccessMessage(toast, "Successfully added to the Love Games!");
    }
  };

  const handleLoveGame = async () => {
    try {
      const gameId = { game_detail_id: info?.id };
      const { data } = await addGameLove(gameId);
      if (!data) return;

      const res = await getUserInfo(usernameAuth);
      setUserInfo(res?.data);

      if (userInfo) {
        checkIsLoved();
      }
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    if (userInfo?.lovedGame && info?.id) {
      setIsLoved(userInfo?.lovedGame?.includes(info?.id));
    }
  }, [info]);

  return (
    <Tooltip label="Love Game" placement="bottom">
      <div>
        <IconHeart
          className={`cursor-pointer transition-all duration-150 w-8 h-8 active:scale-90 ${
            isLoved ? "text-[#fd384f]" : "text-[#929292]"
          }`}
          onClick={handleLoveGame}
        />
      </div>
    </Tooltip>
  );
}

export default AddLove;
