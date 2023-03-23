import { staticPaths } from "@/utils/$path";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import imgSuccess from "../../public/images/success.png";

function VerifyEmailSuccessful() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <Image alt="" src={imgSuccess} />
      <p className="text-[#04CD00] text-[40px] font-bold">Verify success!</p>
      <Link href={staticPaths.home}>
        <button className="btn-save-gradient text-white w-[133px] h-[36px] text-xl font-semibold">
          Let’s Play
        </button>
      </Link>
    </div>
  );
}

export default VerifyEmailSuccessful;
