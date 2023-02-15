/* eslint-disable @next/next/no-img-element */
import { IconCoin22 } from "@/resources/icons";
import React from "react";

const PlayTimeItem = ({ isOwner }) => {
  return (
    <div className="bg-pink-900 border border-pink-400 rounded-[30px] p-2.5">
      <img
        src="https://images.unsplash.com/photo-1518281361980-b26bfd556770?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=810&q=80"
        alt=""
        className="w-[204px] h-[204px] object-cover inline-block rounded-[20px] max-[990px]:w-full"
      />
      <p className="text-white text-base font-bold mt-[5px]">Dog hug coin</p>
      <div className="flex justify-end text-sm">
        {isOwner ? (
          <button className="bg-[#350F1E] px-[25px] py-[5px] rounded-[30px] border border-[#F5F3FF] font-medium">
            Owned
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 font-black">
              70 <IconCoin22></IconCoin22>
            </div>
            <button
              className="bg-violet-700 px-[25px] py-[5px] rounded-[30px] border border-[#F5F3FF] font-medium 
         hover:bg-[#350F1E] transition-all"
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayTimeItem;
