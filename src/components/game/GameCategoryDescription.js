import React from "react";

import { useSelector } from "react-redux";

import Breadcrumb from "@/components/ui/Breadcrumb";

import { dynamicPaths, staticPaths } from "@/utils/$path";

const GameCategoryDescription = () => {
  const { categoryDetail } = useSelector(({ game }) => game) ?? {};

  const { game_category } = categoryDetail ?? {};
  const { label, description, superslug, slug } = game_category ?? {};

  const breadcrumbsData = [
    {
      label: "Home",
      url: staticPaths.home,
    },
    {
      label,
      url: dynamicPaths.category_by_slug(superslug?.value, slug),
    },
  ];

  return (
    <div className="text-white bg-blur-800 w-full py-4 px-7 rounded-2xl mt-[110px] min-h-[300px]">
      <Breadcrumb list={breadcrumbsData} />

      <h2 className="text-[28px] font-bold mb-2 leading-8">{label}</h2>
      <p>{description}</p>
    </div>
  );
};

export default GameCategoryDescription;
