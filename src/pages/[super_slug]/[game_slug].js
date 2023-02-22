import React, { useEffect, useState } from "react";

import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";

import GameDetailGrid from "@/components/ui/GameDetailGrid";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";
import {
  getAllCategories,
  getGameByCategoryId,
  getGameDetailBySlug,
} from "@/services/game.service";
import { useRouter } from "next/router";
import { isEmpty, notifyErrorMessage } from "@/utils/helper";
import { useToast } from "@chakra-ui/react";

const GameDetail = () => {
  const router = useRouter();
  const toast = useToast();

  const [params, setParams] = useState();

  const [game, setGame] = useState();
  const [gamesRelate, setGamesRelate] = useState();
  const [categories, setCategories] = useState();

  const handleGetGameDetailData = async () => {
    try {
      const res = await getGameDetailBySlug(params);
      if (!res.success) {
        throw new Error(res?.message);
      }

      const { data } = res;
      setGame(data);

      const {
        game_category: { id },
      } = data;

      const response = await getGameByCategoryId(id);
      if (!response.success) {
        throw new Error(res?.message);
      }

      setGamesRelate(response?.data?.rows);
    } catch (error) {
      notifyErrorMessage(toast, error);
    }
  };

  const handleGetAllCategories = async () => {
    try {
      const res = await getAllCategories();
      if (!res.success) {
        throw new Error(res?.message);
      }

      const { data } = res;
      setCategories(data);
    } catch (error) {
      notifyErrorMessage(toast, error);
    }
  };

  useEffect(() => {
    if (!params || isEmpty(params)) return;
    handleGetGameDetailData();
  }, [params]);

  useEffect(() => {
    setParams(router.query);
  }, [router]);

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Game detail</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <div className="w-min">
          <GameDetailGrid game={game} gamesRelate={gamesRelate} />
          <GameCategoryGrid categories={categories} />
        </div>
      </MainLayout>
    </>
  );
};

export default GameDetail;

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  };
}
