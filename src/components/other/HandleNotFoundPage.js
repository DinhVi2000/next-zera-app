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
  useEffect(() => {
    sleep(1).then(() => loading_ref.current.classList.add("bg-blur-500"));
  }, []);

  const loading_ref = useRef();

  return (
    <div ref={loading_ref} className="w-full h-[100vh] transition-all"></div>
  );
};
