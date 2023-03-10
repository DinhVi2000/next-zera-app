import React from "react";

import Footer from "@/components/ui/Footer";
import SideBar from "@/components/ui/SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <div className="flex justify-center gap-4 p-4 w-auto mx-auto relative max-[1000px]:w-full">
        <SideBar />
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
