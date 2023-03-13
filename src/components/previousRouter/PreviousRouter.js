/* eslint-disable indent */
import { IconArrowLeft } from "@/resources/icons";
import { toUpperCaseFirstLetter } from "@/utils/helper";
import { useRouter } from "next/router";
import React from "react";

function PreviousRouter() {
  const router = useRouter();
  const previousRoute = localStorage.getItem("previousRoute");

  return (
    <div>
      <button className="flex items-center" onClick={() => router.back()}>
        <IconArrowLeft />
        <span className="ml-2 text-[#EC4899]">Back</span>
      </button>
      <div>
        {previousRoute === "/"
          ? "Home"
          : toUpperCaseFirstLetter(
              previousRoute?.replace("/", "")?.replaceAll("-", " ")
            )}{" "}
        /{" "}
        {router?.asPath?.replace("/", "")?.includes("/")
          ? toUpperCaseFirstLetter(
              router?.asPath?.split("/")?.slice(-1).pop()?.replaceAll("-", " ")
            )
          : toUpperCaseFirstLetter(router?.asPath)
              ?.replace("/", "")
              ?.replace("-", " ")}
      </div>
    </div>
  );
}

export default PreviousRouter;
