/* eslint-disable @next/next/no-img-element */
import React from "react";

const GameCategory = ({ size, ...rest }) => {
  return (
    <>
      {size === 4 ? (
        <div
          {...rest}
          className={`rounded-2xl overflow-hidden relative cursor-pointer max-h-[204px]
                      hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 shadow-[0px_6px_12px_0px_rgb(0,0,0,0.24)]`}
        >
          <img
            alt=""
            src={
              "https://img.poki.com/cdn-cgi/image/quality=78,width=204,height=204,fit=cover,f=auto/CAGA3.jpg"
            }
            className="rounded-2xl w-full h-full"
          ></img>
          <span className="bg-white text-violet-900 uppercase absolute w-full bottom-0 px-4 font-bold text-[13px] h-9 flex items-center">
            Action games
          </span>
        </div>
      ) : (
        <div
          {...rest}
          className={`rounded-2xl overflow-hidden relative flex items-center bg-white cursor-pointer max-h-[94px]
                      hover:translate-y-[-2px] hover:scale-105 transition-all duration-300`}
        >
          <img
            alt=""
            src={
              "https://img.poki.com/cdn-cgi/image/quality=78,width=204,height=204,fit=cover,f=auto/CAGA3.jpg"
            }
            className=" w-[94px] h-[94px]"
          ></img>
          <div className="text-violet-900 uppercase w-full px-2 font-bold text-sm h-9 flex items-center leading-5 cursor-pointer">
            Action games
          </div>
        </div>
      )}
    </>
  );
};

export default GameCategory;
