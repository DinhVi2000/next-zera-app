/* eslint-disable @next/next/no-img-element */
import { IconCoin } from "@/resources/icons";
import React from "react";

const TopHallOfFame = ({ ...props }) => {
  return (
    <div
      className="bg-[#18181899] border-[2px] border-pink-600 rounded-[10px] text-white overflow-auto"
      {...props}
    >
      <div className="text-[28px] font-semibold bg-blur-500 py-2.5 text-center ">
        Hall of Fame
      </div>

      <div className="flex flex-col gap-4 text-white p-5">
        {Array(7)
          .fill(0)
          .map((e, i) => (
            <div key={i} className="bg-blur-600 p-2.5 rounded-[10px] flex">
              <div className="flex gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                  className="min-w-[62px] h-[62px] rounded-full object-cover"
                />
                <div>
                  <h2 className="text-base font-bold">Username</h2>
                  <p className="text-xs font-medium">
                    User’s quote:Lorem ipsum dolor sit amet consectetur
                    adipiscing elit Ut et.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 pl-1.5 border-transparent border-l-white  border-[1px]">
                <span className="text-sm font-bold">1000</span>
                <IconCoin />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopHallOfFame;
