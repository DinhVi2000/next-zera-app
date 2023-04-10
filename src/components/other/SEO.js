import Head from "next/head";
import React from "react";
import ImgThumbNail from "../../../public/images/thumbnail.png";

const SEO = ({ title, description }) => {
  return (
    <Head>
      <title>{title || "Online Games on Zera"}</title>
      <meta name="title" content={title || "Online Games on Zera"}></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />

      <meta name="image" content={ImgThumbNail}></meta>
      <meta name="og:image" content={ImgThumbNail}></meta>
      <meta name="description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
    </Head>
  );
};

export default SEO;
