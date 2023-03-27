/* eslint-disable indent */
import { useAuthContext } from "@/context/auth-context";
import { IconArrowLeft } from "@/resources/icons";
import { toUpperCaseFirstLetter } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function PreviousRouter({ ...props }) {
  const { prevRoute } = useAuthContext();

  const router = useRouter();

  return (
    <div {...props}>
      {/* <button className="flex items-center" onClick={() => router.back()}>
        <IconArrowLeft />
        <span className="ml-2 text-[#EC4899]">Back</span>
      </button> */}
      <div className="my-5">
        {/* {prevRoute === "/"
          ? "Home"
          : toUpperCaseFirstLetter(
              prevRoute?.replace("/", "")?.replaceAll("-", " ")
            )}{" "} */}
        <Link href="/" className="hover:text-[#EC4899]">
          Home
        </Link>{" "}
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
