import React, { memo } from "react";

import {
  IconDiscord,
  IconReddit,
  IconTelegram,
  IconTwitter,
} from "@/resources/icons";

import Image from "next/image";

import logo_lg from "../../../public/images/logo_lg.png";
import bg_footer from "../../../public/images/bg_footer.png";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="h-fit relative mt-[145px]">
        <Image src={bg_footer} className="w-full" alt=""></Image>
        <div className="flex w-full justify-between px-[70px] py-[50px] absolute bottom-0">
          {/* logo */}
          <div className="bg-white w-fit rounded-[30px] p-[10px] ">
            <Image src={logo_lg} className="m-0" alt=""></Image>
          </div>

          <div className="flex gap-[84px]">
            {/* email */}
            <div className="text-white">
              <p className="text-[28px] font-semibold mb-2.5">Newsletter</p>
              <input
                type="text"
                placeholder="Enter your email"
                className="rounded-[10px] p-2 w-full mb-2.5 text-black"
              />
              <button className="rounded-[10px] px-[10px] py-[5px] border border-white text-base">
                Subscribe now
              </button>
            </div>

            {/* contact */}
            <div className="text-white">
              <p className="text-[28px] font-semibold mb-2.5">Useful links</p>
              <Link href="/about" className="block mb-2.5">
                About us
              </Link>
              <Link href="/policy" className="block mb-2.5">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block mb-2.5">
                Terms
              </Link>
              <Link href="/contact" className="block mb-2.5">
                Contact
              </Link>

              <div className="flex gap-3 items-center">
                <IconReddit />
                <IconTwitter />
                <IconTelegram />
                <IconDiscord />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Footer);
