import Head from "next/head";

import MainLayout from "@/layouts/MainLayout";
import GameGrid from "@/components/ui/GameGrid";
import GameCategoryGrid from "@/components/ui/GameCategoryGrid";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME } from "@/utils/constant";
import { useEffect } from "react";

export default function Home() {
  const { openModal } = useModalContext();

  useEffect(() => {
    openModal(MODAL_NAME.DAILY_BONUS);
  }, []);

  return (
    <>
      <Head>
        <title>Zera</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <div className="w-min">
          <GameGrid />
          <GameCategoryGrid />
        </div>
      </MainLayout>
    </>
  );
}
