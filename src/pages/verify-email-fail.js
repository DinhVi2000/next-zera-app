import { staticPaths } from "@/utils/$path";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import imgFail from "../../public/images/fail.png";

function VerifyEmailFail() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <Image alt="" src={imgFail} />
      <p className="text-[#FF0303] text-[40px] font-bold">Verify fail!</p>
      <Link href={staticPaths.home}>
        <button className="btn-save-gradient text-white w-[133px] h-[36px] text-xl font-semibold">
          Back home
        </button>
      </Link>
    </div>
  );
}

export default VerifyEmailFail;
