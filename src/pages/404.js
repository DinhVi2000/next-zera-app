import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="h-[100vh] w-full flex-center">
      <div className="text-white">
        <h1 className="text-6xl min-[550px]:text-6xl min-[990px]:text-9xl text-center font-bold">
          ERROR
        </h1>
        <div className="text-base text-center mb-5">
          <span className="px-3">
            Sorry, the page you requested does not exist on this site.
          </span>
        </div>
        <div className="text-center">
          <Link href={"/"}>
            <button
              type="submit"
              className="text-base rounded-[20px] bg-linear-violet-300 w-[50%] py-3
                         transition-all hover:scale-105"
            >
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
