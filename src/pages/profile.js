import React from "react"

import Image from "next/image"
import coverImg from "../../public/images/cover-user.png"
import avaImg from "../../public/images/ava-user.png"
import { IconCoin, IconPlus, IconCopy } from "@/resources/icons"
import Activities from "@/components/profile/activities"
import Rewards from "@/components/profile/rewards"

function Profile() {
  return (
    <div className="w-[90%]">
      <div className="flex flex-col">
        <div>
          <Image
            className="w-full object-cover rounded-[20px]"
            src={coverImg}
          />
        </div>
        <div className="flex items-end pl-[43px] mt-[-100px]">
          <div className="mr-[16px]">
            <Image src={avaImg} />
          </div>

          <div className="w-full flex justify-between">
            <div>
              <p className="font-semibold text-[28px]">Username</p>
              <p className="font-medium">
                User’s quote:Lorem ipsum dolor sit amet consectetur adipiscing
                elit Ut et.
              </p>
            </div>
            <div className="h-fit px-[10px] py-[6px] flex items-center content-center bg-[#4C1D95] rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <p className=" font-black text-[24px] mr-[5px]">70</p>
              <IconCoin className="mr-[10px]" />
              <IconPlus />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-[26px] gap-x-[18px]">
        <div className="w-[30%]">
          <div className="rounded-[20px] bg-[#00000080]">
            <h4 className="rounded-t-[20px] bg-[#EC4899] py-[22px] pl-[16px] text-[28px] font-bold">
              Stats
            </h4>
            <div className="pl-[28px] text-[28px]">
              <p className="mt-[34px] flex items-center cursor-pointer">
                77 minutes left <IconPlus className="ml-[10px]" />
              </p>
              <p className="mt-[34px]">Playstreak: 5 days</p>
              <p className="text-[16px] opacity-60">Highest streak: 15 days</p>
              <p className="mt-[34px]">12 games played</p>
              <p className="mt-[34px]">6 games loved</p>
              <p className="mt-[34px] mb-[100px]">Joined 6 years ago</p>
            </div>
            <h5
              className="rounded-b-[20px] bg-[#8B5CF6] py-[18px] flex items-center justify-center cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://zeraverse.io?src=@zeraverse"
                )
              }
            >
              https://zeraverse.io?src=@zeraverse
              <IconCopy className="ml-[10px]" />
            </h5>
          </div>
          <Rewards />
        </div>
        <Activities />
      </div>
    </div>
  )
}

export default Profile
