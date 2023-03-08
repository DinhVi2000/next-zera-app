import React from "react";
import { useAuthContext } from "@/context/auth-context";
import { getArea, notifySuccessMessage } from "@/utils/helper";
import ImageLoading from "../loading/ImageLoading";
import { useToast } from "@chakra-ui/react";

const ReferAFriend = ({ area, ...props }) => {
  const { userInfo } = useAuthContext();
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${userInfo?.ref_link}`);
    notifySuccessMessage(
      toast,
      "Copy successful, send referral link to friends now!"
    );
  };

  return (
    <div
      style={{ gridArea: getArea(area) }}
      className="mb-hidden bg-[#D9D9D9] text-black w-full h-full flex items-center justify-center overflow-hidden relative rounded-2xl cursor-pointer"
      {...props}
      onClick={handleCopy}
    >
      <ImageLoading
        src={
          "https://img.freepik.com/premium-vector/refer-friend-banner-with-megaphone-blue-spot-referral-program-promotional-advertisement-campaign-marketing_87771-14852.jpg?w=2000"
        }
      />
    </div>
  );
};

export default ReferAFriend;
