import React from "react";
import ImageLoading from "../loading/ImageLoading";

const ReferAFriend = ({ ...props }) => {
  return (
    <div
      className="bg-[#D9D9D9] text-black w-full h-full flex items-center justify-center overflow-hidden relative rounded-2xl cursor-pointer"
      {...props}
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
