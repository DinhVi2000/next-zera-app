import PageNotFound from "@/pages/404";
import React, { Fragment } from "react";

const HandleNotFoundPage = ({ isValidPage, children }) => {
  if (isValidPage === true) return <Fragment>{children}</Fragment>;
  if (isValidPage === false) return <PageNotFound />;
};

export default HandleNotFoundPage;
