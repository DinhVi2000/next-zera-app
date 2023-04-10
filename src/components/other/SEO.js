import Head from "next/head";
import React from "react";

const SEO = ({ title, description }) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />

      <title>{title || "Online Games on Zera"}</title>
      <meta name="title" content="Online Games on Zera" />
      <meta name="description" content="description" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://user-web.test.rivennft.io/" />
      <meta property="og:title" content="Online Games on Zera" />
      <meta property="og:description" content="description" />
      <meta
        property="og:image"
        content="https://user-web.test.rivennft.io/images/thumbnail.png"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://user-web.test.rivennft.io/"
      />
      <meta property="twitter:title" content="Online Games on Zera" />
      <meta property="twitter:description" content="description" />
      <meta
        property="twitter:image"
        content="https://user-web.test.rivennft.io/images/thumbnail.png"
      />
    </Head>
  );
};

export default SEO;
