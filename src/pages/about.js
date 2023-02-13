/* eslint-disable no-console */
import React from "react";

import Head from "next/head";

import { IconBack } from "@/resources/icons";

const About = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>About page</p>
        <IconBack height="300" width="200" />
      </main>
    </>
  );
};

export default About;
