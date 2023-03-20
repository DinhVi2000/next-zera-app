import Link from "next/link";
import React from "react";

const Breadcrumb = ({ list, ...props }) => {
  return (
    <div className="" {...props}>
      {list?.map(({ label, url }, i) => (
        <span className="" key={i}>
          <Link href={url}>{label}</Link>
          {i !== list.length - 1 && <span> / </span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
