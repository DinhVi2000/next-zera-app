import React from "react";

import { getShareToEarn } from "@/services/user.service";
import {
  notifyErrorMessage,
  notifySuccessMessage,
  getArea,
} from "@/utils/helper";
import { useToast } from "@chakra-ui/react";
import { InlineShareButtons } from "sharethis-reactjs";

const ShareToEarn = ({ area, ...props }) => {
  const toast = useToast();
  const handleShare = async () => {
    try {
      await getShareToEarn();
      notifySuccessMessage(toast, "You earned share reward today!");
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  return (
    <div
      style={{ gridArea: getArea(area) }}
      className="mb-hidden bg-[#831843] border-[3px] border-[#EC4899] text-base font-bold w-full h-full flex flex-col items-center justify-center rounded-2xl text-white px-7"
      {...props}
    >
      <div className="mb-2 text-[19px] font-semibold">Share to earn 1 coin</div>
      <div onClick={handleShare}>
        <InlineShareButtons
          config={{
            alignment: "center",
            color: "social",
            enabled: true,
            font_size: 16,
            labels: "cta",
            language: "en",
            networks: [
              "facebook",
              "messenger",
              "linkedin",
              "twitter",
              "whatsapp",
            ],
            padding: 0,
            radius: 4,
            show_total: true,
            size: 40,

            min_count: 100000,
            url: "https://user-web.test.rivennft.io/",
            image: "https://bit.ly/2CMhCMC",
            description: "custom text",
            title: "custom title",
            message: "custom email text",
            subject: "custom email subject",
            username: "custom twitter handle",
          }}
        />
      </div>
    </div>
  );
};

export default ShareToEarn;
