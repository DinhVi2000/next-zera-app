import React from "react";

import Footer from "@/components/ui/Footer";
import TopBar from '@/components/ui/TopBar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="flex justify-between gap-4 p-4 w-fit mx-auto relative">
        <TopBar />
        <div className="ml-[222px]">{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
