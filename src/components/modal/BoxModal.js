import React, { memo } from "react";

const BoxModal = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default memo(BoxModal);
