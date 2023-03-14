import React, { memo } from "react";

import {
  IconDiscord,
  IconReddit,
  IconTelegram,
  IconTwitter,
} from "@/resources/icons";

import Image from "next/image";

import logo_lg from "../../../public/images/logo_lg.png";
import Link from "next/link";
import NewsLetterForm from "../form/NewsLetterForm";

const Footer = () => {
  return (
    <>
      <div className="h-fit bg-footer relative mt-[145px]">
        {/* <Image src={bg_footer} className="w-full" alt=""></Image> */}
        <div
          className="flex w-full justify-between px-[70px] py-[50px] bottom-0
                        max-[1060px]:flex-col max-[1060px]:items-center"
        >
          {/* logo */}
          <div
            className="bg-white w-fit rounded-[30px] p-[10px] max-[1060px]:mb-10"
          >
            <Image src={logo_lg} className="m-0" alt=""></Image>
          </div>

          <div className="flex max-[550px]:flex-col gap-[84px]">
            <NewsLetterForm />

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
