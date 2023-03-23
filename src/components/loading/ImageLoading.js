/* eslint-disable @next/next/no-img-element */
import React, { memo, useEffect, useRef, useState } from "react";

const ImageLoading = ({ src, alt, className, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  const img_ref = useRef(null);

  const handleLoadImage = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (img_ref.current && img_ref.current.complete && src) {
      handleLoadImage();
    }
  });

  return (
    <>
      <img
        src={src}
        alt={alt}
        ref={img_ref}
        onLoad={(e) => handleLoadImage(e)}
        className={loaded ? className : "hidden"}
        {...props}
      />
      {loaded ? null : <div className={`${className} skeleton-shine`}></div>}
    </>
  );
};

export default memo(ImageLoading);
