import Image from "next/image";
import React from "react";
import emptyImg from "../../../public/images/empty.png";

function Empty() {
  return (
    <div className="flex-center flex-col mx-auto w-full h-full">
      <Image
        alt=""
        width={100}
        height={100}
        src={emptyImg}
        className="block mx-auto"
      />
      <h3 className="text-xl font-bold">No data</h3>
    </div>
  );
}

export default Empty;
