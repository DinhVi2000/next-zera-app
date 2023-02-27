import Image from "next/image";
import React from "react";
import emptyImg from "../../../public/images/empty.png";

function Empty() {
  return (
    <div className="w-full h-[300px] min-w-[1000px] flex-center flex-col">
      <Image
        alt=""
        width={150}
        height={150}
        src={emptyImg}
        className="block mx-auto"
      />
      <h3 className="text-xl font-bold">No data</h3>
    </div>
  );
}

export default Empty;
