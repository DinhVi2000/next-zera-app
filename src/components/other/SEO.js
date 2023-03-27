import Head from "next/head";
import React from "react";

const SEO = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
