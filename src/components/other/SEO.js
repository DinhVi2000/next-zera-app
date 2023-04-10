import Head from "next/head";
import React from "react";

const SEO = ({ title, description }) => {
  return (
    <Head>
      <title>{title || "Online Games on Zera"}</title>
      <meta name="title" content={title || "Online Games on Zera"}></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <meta
        property="image"
        content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
      />
      <meta name="description" content={description} />

      <meta
        property="og:image"
        content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
      />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="https://user-web.test.rivennft.io" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta
        property="twitter:image"
        content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
      />
    </Head>
  );
};

export default SEO;
