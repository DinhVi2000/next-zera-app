import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Breadcrumb = ({ list, ...props }) => {
  const router = useRouter();

  const handlePushToUrlRoute = (url, disable) => {
    !disable && router.push(url);
  };

  return (
    <div className="" {...props}>
      {list?.map(({ label, url, disable }, i) => (
        <span
          className="cursor-default"
          key={i}
          onClick={() => handlePushToUrlRoute(url, disable)}
        >
          <span>{label}</span>
          {i !== list.length - 1 && <span> / </span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
