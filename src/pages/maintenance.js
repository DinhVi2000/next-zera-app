import React from "react";
import logo_lg from "../../public/images/logo_lg.png";
import rocket from "../../public/images/rocket-under.png";
import Image from "next/image";
import { IconLogo } from "@/resources/icons";
import Link from "next/link";

function Maintenance() {
  return (
    <div className="w-full h-full relative text-white">
      <Link href={"/"}>
        <Image
          src={logo_lg}
          className="absolute top-10 left-10 w-[200px] h-[108px] max-[880px]:hidden"
          alt=""
        ></Image>
      </Link>
      <Link href={"/"}>
        <IconLogo className="absolute top-10 left-10 w-14 h-14 min-[881px]:hidden" />
      </Link>
      <div className="h-[100vh] w-full flex-center max-[882px]:flex-col-reverse px-5">
        <div>
          <p className="text-[64px] font-bold leading-[140%] max-[1174px]:text-[50px] max-[880px]:hidden max-[426px]:block max-[426px]:text-[30px]">
            We are <br /> Under Maintenance
          </p>
          <p className="text-[64px] font-bold leading-[140%] max-[1174px]:text-[50px] max-[665px]:text-[30px] max-[426px]:hidden min-[881px]:hidden">
            We are under Maintenance
          </p>
          <p className="text-xl font-extralight">
            We are improving our website.
          </p>
          <p className="text-xl font-extralight">We’ll be back shortly.</p>
        </div>
        <Image
          src={rocket}
          className="w-[40%] h-auto object-cover max-[700px]:w-[100%]"
          alt=""
        ></Image>
      </div>
    </div>
  );
}

export default Maintenance;
