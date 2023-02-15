import Head from "next/head";

import { useToast } from "@chakra-ui/react";

import Games from "@/api/games.json";
import Categories from "@/api/categories.json";

import MainLayout from "@/layouts/MainLayout";
import GameCategory from "@/components/game/GameCategory";
import GameTile from "@/components/game/GameTile";

export default function Home() {
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
          {/* games */}
          <div className="game-grid">
            {Array(30)
              .fill(0)
              .map((e, i) => (
                <GameTile key={i} size={1}></GameTile>
              ))}
            {Games.map((e, i) => (
              <GameTile
                size={e?.size}
                key={i}
                style={{
                  gridArea: `ip${e?.ip} / ip${e?.ip} / ip${e?.ip} / ip${e?.ip}`,
                }}
                ip={e?.ip}
              ></GameTile>
            ))}
          </div>

          {/* categories */}
          <div className="category-grid py-4">
            {Categories.map((e, i) => (
              <GameCategory
                key={i}
                style={{
                  gridArea: `c${e?.ip} / c${e?.ip} / c${e?.ip} / c${e?.ip}`,
                }}
                size={e?.size}
              ></GameCategory>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
