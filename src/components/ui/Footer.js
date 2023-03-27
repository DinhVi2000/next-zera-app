import React, { memo, useEffect, useState } from "react";

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
import { contact } from "@/services/user.service";

const Footer = () => {
  const [contacts, setContacts] = useState([]);

  const icon = [
    { name: "Facebook", icon: <IconReddit /> },
    { name: "Twitter", icon: <IconTwitter /> },
    { name: "Telegram", icon: <IconTelegram /> },
    { name: "Discord", icon: <IconDiscord /> },
  ];

  const getContact = async () => {
    try {
      const { data } = await contact();
      setContacts(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <div className="h-fit bg-footer relative mt-[145px]">
        <div
          className="flex w-full justify-between px-[70px] py-[50px] bottom-0
                        max-[1060px]:flex-col max-[1060px]:items-center"
        >
          {/* logo */}
          <div className="w-[300px] h-[140px] flex items-end relative">
            <Image
              src={logo_lg}
              className="w-auto h-[140px] max-[1060px]:static absolute top-[60%]"
              alt=""
            ></Image>
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
                {contacts?.map((e, i) => (
                  <div key={i}>
                    <Link href={e?.link} target="_blank">
                      {icon?.find((item) => item?.name === e?.network)?.icon}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Footer);
