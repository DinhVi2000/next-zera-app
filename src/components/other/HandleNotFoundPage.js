import PageNotFound from "@/pages/404";
import { sleep } from "@/utils/helper";
import React, { Fragment, useEffect, useRef } from "react";

const HandleNotFoundPage = ({ isValidPage, children }) => {
  const nodeObj = {
    true: <Fragment>{children}</Fragment>,
    false: <PageNotFound />,
    undefined: <LoadingPage />,
  };

  return nodeObj[isValidPage];
};

export default HandleNotFoundPage;

const LoadingPage = () => {
  const loading_ref = useRef();

  useEffect(() => {
    sleep(1).then(() => loading_ref?.current?.classList.add("bg-blur-500"));
  }, []);

  return (
    <div
      ref={loading_ref}
      className="w-full flex-center h-[100vh] transition-all"
    >
      <div className="dots-5"></div>
    </div>
  );
};
