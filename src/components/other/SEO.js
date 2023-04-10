import Head from "next/head";
import React from "react";

const SEO = ({ title, description }) => {
  return (
    <Head>
      <title>{title || "Online Games on Zera"}</title>
      <meta name="title" content={title || "Online Games on Zera"}></meta>
      <meta name="og:description" content={description} />
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <meta
        property="og:image"
        content="../../../public/images/thumbnail.png"
      ></meta>
      <meta
        property="image"
        content="../../../public/images/thumbnail.png"
      ></meta>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
