import React from "react";

import Footer from "@/components/ui/Footer";
import SideBar from "@/components/ui/SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-[100vh] w-full">
      <div className="flex justify-between gap-4 p-4 w-fit mx-auto relative">
        <SideBar />
        <div>{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
